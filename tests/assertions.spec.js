const {test, expect} = require('@playwright/test');

  
test("Verify Dialog Alert", async ({ page }) => {
 
  const url = "https://testautomationpractice.blogspot.com/";
  await page.goto(url);
  await page.getByText("PlaywrightPractice").click();
  await expect(page).toHaveURL(/.*\/test/);


})