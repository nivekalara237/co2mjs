import _package from "../package.json" with { type: "json" };
import { execSync } from "node:child_process";
import * as fs from "node:fs";

export function run(script) {
  return new Promise((resolve, reject) => {
    try {
      execSync(script + "", (error, output) => {
        if (error) {
          throw error;
        }
        return resolve(output);
      });
    } catch (e) {
      return reject(e.message);
    }
  });
}

export function replaceTextInFile(file, find, target) {
  const content = fs.readFileSync(file, "utf-8");
  const newContent = content.replace(find, target);
  return Promise.all([run(`echo '${newContent}' > ${file}`)]);
}

export function prepareDistDir() {
  return Promise.all([
    // run("touch dist/package.json && cat package.json >> dist/package.json"),
    run(
      `touch dist/version.txt && echo '${_package.version}' > dist/version.txt`
    ),
  ]);
}
