import esbuild from "esbuild";
import { run } from "./utils.js";

Promise.all([
  run("tsc -p tsconfig.json"),
  // bundle for esm
  esbuild.build({
    entryPoints: ["src/lib/index.ts"],
    format: "esm",
    platform: "node",
    outfile: "./dist/index.js",
    minify: false,
    bundle: true,
  }),

  // bundle for commonjs
  esbuild.build({
    entryPoints: ["src/lib/index.ts"],
    format: "cjs",
    bundle: true,
    minify: false,
    platform: "node",
    outfile: "./dist/index.cjs",
  }),

  // bundle for browser
  esbuild.build({
    entryPoints: ["src/lib/index.ts"],
    format: "iife",
    bundle: true,
    minify: true,
    outfile: "./dist/index.min.js",
    platform: "browser",
  }),
]).then();
