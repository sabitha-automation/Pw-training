import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';
 
export default defineConfig({
  
  // put your *.spec.ts files here
  testDir: './tests', 
  /* Run tests in files in parallel */
  fullyParallel: true,
  // one retry locally (good for learning)
  retries: 0,
  // per-test timeout (ms)
  timeout: 30_000,                   
  // assertion timeout (ms)
  expect: { timeout: 5_000 },   
  
  reporter: [ 
  // HTML report for every test in a single run report
    ['html', { 
      outputFolder: 'html-report',  // where the static HTML is written
      open: 'always'                  // 'never' | 'on-failure' | 'always'
    }],

      
    ['allure-playwright', {
          resultsDir: 'allure-results',      // <- Allure 3.x option
          detail: true,                      // include pw:api + hooks as steps (set false to reduce noise)
          suiteTitle: false,                 // keep suite names human-friendly
          environmentInfo: {                 // will be visible in report Overview
            os_platform: os.platform(),
            os_release: os.release(),
            node_version: process.version,
          },
        }],
  ],
  // artifacts (screenshots/videos/traces)

  outputDir: 'test-results',    
  // Artifacts
   use: {
    baseURL: 'https://jsonplaceholder.typicode.com/comments?postId=1',
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',   // 'on' | 'off' | 'only-on-failure'
    video: 'off',      // 'on' | 'off' | 'retain-on-failure'
    trace: 'on-first-retry',         // 'on' | 'off' | 'on-first-retry'
  },

  // Only desktop Chromium for now

  projects: [
    { 
      name: 'Edge',
        use: {
          channel: 'msedge',
          ...devices['Desktop Edge'],
          headless: false,
          launchOptions: { slowMo: 500 },
        },
      }
      //{
        //name: 'Chrome',
        //use: {
          //channel: 'chrome',
          //...devices['Desktop Chrome'],
 // uses locally installed Chrome
      //headless: false,
      //launchOptions: { slowMo: 2000 }, // tune delay you want to watch
    //}
  ],

});

