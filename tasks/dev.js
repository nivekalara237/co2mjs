import esbuild from "esbuild";
import { run } from "./utils.js";

await Promise.all([
  await run("tsc -p tsconfig.json --watch --incremental"),
  (
    await esbuild.context({
      entryPoints: ["src/index.ts"],
      format: "esm",
      outdir: "./dist",
      sourcemap: true,
    })
  ).watch(),
]);
