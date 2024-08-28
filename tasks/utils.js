import { exec } from "child_process";
export function run(script) {
  return new Promise((resolve, reject) => {
    try {
      exec(script + "", (error, output) => {
        if (error) {
          // throw error
          console.log(error);
        }
        return resolve(output);
      });
    } catch (e) {
      return reject(e.message);
    }
  });
}
