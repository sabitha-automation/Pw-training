import { test } from '../fixtures/base.fixtures.js';
const { expect } = test;

  
test("Verify Dialog Alert", async ({ page }) => {
 
  const url = "https://testautomationpractice.blogspot.com/";
  await page.goto(url);
  await page.getByText("PlaywrightPractice").click();
  await expect(page).toHaveURL(/.*\/test/);


})