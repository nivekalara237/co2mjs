import esbuild from "esbuild";

Promise.all([
  esbuild.build({
    entryPoints: ["src/tests/**/*.spec.ts"],
    format: "iife",
    platform: "browser",
    minify: false,
    bundle: true,
    outdir: "web-build"
  })
])