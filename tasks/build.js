import esbuild from "esbuild";
import { replaceTextInFile, run } from "./utils.js";
import copy from "esbuild-plugin-copy";
import writeFilePlugin from "esbuild-plugin-write-file";
import _package from "../package.json" with { type: "json" };
import textReplace from "esbuild-plugin-text-replace";

Promise.all([
  run("tsc -p tsconfig.build.json"),
  replaceTextInFile("./dist/index.d.ts", '"index"', '"co2m.js"'),
  // bundle for esm
  esbuild.build({
    entryPoints: ["src/lib/index.ts"],
    format: "esm",
    platform: "node",
    outfile: "./dist/index.js",
    minify: false,
    bundle: true,
  }),

  // bundle for commonjs & copy necessary files
  esbuild.build({
    entryPoints: ["src/lib/index.ts"],
    format: "cjs",
    bundle: true,
    minify: false,
    platform: "node",
    outfile: "./dist/index.cjs",
    plugins: [
      copy({
        resolveFrom: "cwd",
        // dryRun: true,
        assets: [
          {
            from: ["./package.json"],
            to: ["./dist/package.json"],
          },
          {
            from: ["./LICENSE"],
            to: ["./dist"],
          },
          {
            from: ["./README.md"],
            to: ["./dist/README.md"],
          },
        ],
      }),
      writeFilePlugin({
        after: {
          "./dist/version.txt": `${_package.version}`,
        },
      }),
      textReplace({
        include: /dist\/index\.d\.ts$/,
        pattern: [["index", "co2m.js"]],
      }),
    ],
  }),

  // bundle for browser
  esbuild.build({
    entryPoints: ["src/lib/index.ts"],
    format: "iife",
    bundle: true,
    minify: true,
    outfile: "./dist/index.min.js",
    platform: "node",
  }),
]).then()
  .catch(er => {
  console.error(er);
});
