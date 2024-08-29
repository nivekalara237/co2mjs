import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "dist/index.min.js",
    sourcemap: "inline",
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: "node",
    format: "iife",
    target: "node14",
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(0));
