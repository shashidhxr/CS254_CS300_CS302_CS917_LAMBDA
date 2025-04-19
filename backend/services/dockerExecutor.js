// backend/services/dockerExecutor.js
import fs from 'fs/promises';
import { exec } from 'child_process';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Execution from '../models/execution.js';
import { fileURLToPath } from 'url';

// ESM __dirname shim
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Executes user code inside a Docker container, enforces timeout,
 * cleans up temp files, and records execution metrics.
 *
 * @param {string} code - The source code to run.
 * @param {string} language - 'python' or 'javascript'.
 * @param {number} timeout - Max execution time in seconds.
 * @returns {Promise<{output:string,error:string,duration:number,success:boolean,timestamp:Date}>}
 */
export default async function executeFunction({ code, language, timeout = 5}) {
  // 1. Write code to a temp file
  const ext = language === 'python' ? 'py' : 'js';
  const filename = `${uuidv4()}.${ext}`;
  const tempDir = path.join(__dirname, '..', 'temp');
  const filepath = path.join(tempDir, filename);

  await fs.mkdir(tempDir, { recursive: true });
  await fs.writeFile(filepath, code);

  // 2. Build Docker command
  const dockerImage = language === 'python' ? 'python:3.11' : 'node:20';
  const containerCmd = language === 'python'
    ? `python /app/${filename}`
    : `node /app/${filename}`;
  const dockerCmd = [
    'docker run --rm',
    `-v ${filepath}:/app/${filename}`,
    dockerImage,
    containerCmd
  ].join(' ');

  // 3. Execute with timeout and measure duration
  const start = Date.now();
  const result = await new Promise((resolve) => {
    exec(dockerCmd, { timeout: timeout * 1000 }, async (err, stdout, stderr) => {
      if (err?.killed) {
        return reject(new Error(`Timeout after ${timeout} seconds`));
      }
      
      const duration = Date.now() - start;
      // Cleanup file
      await fs.unlink(filepath).catch(() => {});

      if (stderr?.includes("Unable to find image")) {
        return resolve({
          output: "",
          error: "Docker image not found. Pull it first with: 'docker pull python:3.11'",
          duration,
          success: false,
          timestamp: new Date()
        });
      }
      
      // Prepare metrics
      const output  = stdout?.trim() || '';
      const error   = stderr?.trim() || '';
      const success = !err;

      // Save to MongoDB
      await Execution.create({
        language,
        duration,
        success,
        output,
        error,
        timestamp: new Date()
      });

      resolve({ output, error, duration, success, timestamp: new Date() });
    });
  });

  return result;
}
