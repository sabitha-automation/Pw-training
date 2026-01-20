import { defineConfig, devices } from '@playwright/test';
import * as os from 'node:os';  // <-- add this
 
export default defineConfig({
  
  // put your *.spec.ts files here
  testDir: './tests', 
  /* Run tests in files in parallel */
  fullyParallel: true,
  // one retry locally (good for learning)
  retries: 1,
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
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',   // 'on' | 'off' | 'only-on-failure'
    video: 'retain-on-failure',      // 'on' | 'off' | 'retain-on-failure'
    trace: 'on-first-retry',         // 'on' | 'off' | 'on-first-retry'
  },

  // Only desktop Chromium for now

  projects: [
    {
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        launchOptions: { slowMo: 2000 }, // tune delay you want to watch
      },
    },

    
  ],

});

