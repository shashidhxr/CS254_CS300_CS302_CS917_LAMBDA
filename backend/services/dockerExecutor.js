const fs = require("fs/promises");
const { exec } = require("child_process");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Execution = require("../models/Execution");

const runCodeInDocker = async (code, language, timeout) => {
  const filename = `${uuidv4()}.${language === "python" ? "py" : "js"}`;
  const filepath = path.join(__dirname, "..", "temp", filename);

  await fs.writeFile(filepath, code);
  const dockerImage = language === "python" ? "python:3.11" : "node:20";
  const containerCmd =
    language === "python"
      ? `python /app/${filename}`
      : `node /app/${filename}`;

  const startTime = Date.now();

  const execCommand = `docker run --rm -v ${filepath}:/app/${filename} ${dockerImage} ${containerCmd}`;

  return new Promise((resolve) => {
    const process = exec(execCommand, { timeout: timeout * 1000 }, async (err, stdout, stderr) => {
      const duration = Date.now() - startTime;

      await fs.unlink(filepath); // cleanup temp file

      // Save execution metrics
      const result = {
        output: stdout.trim(),
        error: stderr.trim(),
        duration,
        success: !err,
        timestamp: new Date()
      };

      await Execution.create({
        language,
        duration,
        success: !err,
        output: stdout.trim(),
        error: stderr.trim(),
        timestamp: new Date()
      });

      resolve(result);
    });
  });
};

module.exports = runCodeInDocker;
