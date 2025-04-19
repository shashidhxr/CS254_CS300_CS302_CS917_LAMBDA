import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';

export const executeFunction = ({ code, language, timeout }) => {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(process.cwd(), 'backend', 'temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const fileName = `${uuidv4()}.${language === 'python' ? 'py' : 'js'}`;
    const filePath = path.join(tempDir, fileName);

    fs.writeFileSync(filePath, code);

    const dockerImage = language === 'python' ? 'python:3.10' : 'node:18';
    const command = `docker run --rm -v ${filePath}:/usr/src/app/code.${language === 'python' ? 'py' : 'js'} -w /usr/src/app ${dockerImage} ${language === 'python' ? 'python' : 'node'} code.${language === 'python' ? 'py' : 'js'}`;

    const child = exec(command, { timeout: timeout * 1000 }, (err, stdout, stderr) => {
      fs.unlinkSync(filePath); // cleanup
      if (err) return reject(stderr || err.message);
      resolve(stdout);
    });
  });
};
