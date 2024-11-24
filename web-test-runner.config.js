import { esbuildPlugin } from "@web/dev-server-esbuild";
import configs from "./jest.config.js"
import { playwrightLauncher } from "@web/test-runner-playwright";

export default /** @type {import("@web/test-runner").TestRunnerConfig} */{
  files: [
    "src/tests/**/*.spec.ts",
    "src/tests/**/*.browser-spec.ts",
  ],
  concurrent: 10,
  plugins: [
    esbuildPlugin({
      ts: true,
      // js: true,
      target: "auto",
      sourceMap: true
    })
  ],
  testFramework: {
    configFile: {
      defaultTimeoutInterval: 5000
    }
  },
  coverage: true,
  coverageConfig: {
    include: ['src/lib/**/*.ts'],
    report: true,
    reportDir: ((jestPath)=>{
      return /<rootDir>\/(.*)/i.exec(jestPath)?.at(1) ?? "web-test-coverage";
    })(configs.coverageDirectory),
    threshold: {...configs.coverageThreshold.global}
  },
  nodeResolve: true,
  browsers: [
    /*chromeLauncher({
      launchOptions: {
        args: ['--no-sandbox']
      }
    }),*/
    playwrightLauncher({
      product: "chromium",
      launchOptions: {
        headless: true,
        chromiumSandbox: false,
        channel: "msedge-dev"
      },
    }),
    /*playwrightLauncher({
      product: "webkit",
      launchOptions: {

      }
    }),*/
    playwrightLauncher({
      product: "chromium",
      launchOptions: {
        headless: true,
        chromiumSandbox: false,
        channel: "chrome"
      },
    }),
    playwrightLauncher({
      product: "firefox",
      launchOptions: {
        headless: true
      },
    }),
    playwrightLauncher({
      product: "chromium",
      launchOptions: {
        headless: true
      },
    })
  ],
  testRunnerHtml: (testFramework) => `
  <html>
    <head>
      <script type="module" src="${testFramework}"></script>
      <script type="module" src="./node_modules/jest-browser-globals/build-es5/index.js"></script>
    </head>
  </html>
  `
}