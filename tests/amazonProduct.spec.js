const {test, expect} = require('@playwright/test');

  
test.only("Verify Amazon Product", async ({ page }) => {
 
  const url = "https://www.amazon.in/";
 
  await page.goto(url);
  await expect(page).toHaveURL(/amazon/);
  await page.getByPlaceholder('Search Amazon.in').fill('mobile stand for desk');
  await page.locator('input[type="submit"]').click();
  const firstProduct = page.locator("div[role='listitem']").first()
  await firstProduct.locator('#a-autoid-3-announce').click();
  await page.getByText('Go to Cart').click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('//*[@name="proceedToRetailCheckout"]')).toBeVisible();
  await expect(page.locator('span.a-truncate-cut')).toContainText('Phone Stand');
  await page.close();
 
});