const {test, expect} = require('@playwright/test');


test.only("Verify Amazon Product", async ({ page }) => {

  const url = "https://www.amazon.in/";

  await page.goto(url);
  await expect(page).toHaveURL(/amazon/);
  await page.getByPlaceholder('Search Amazon.in').fill('mobile stand for desk');
  await page.locator('input[type="submit"]').click();
  const firstProduct = page.locator("div[role='listitem']").first();
  const ProductText = (await firstProduct.innerText()).split('\n')[1];;
  console.log(ProductText)
  await firstProduct.locator('button[aria-label="Add to cart"]').click();
  await page.getByText('Go to Cart').click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('//*[@name="proceedToRetailCheckout"]')).toBeVisible();
  const cartProduct = page.locator('li[class="sc-item-product-title-cont"]').first()
  //const cartProductText = (await cartProduct.innerText());
  //console.log(cartProductText)
  await expect (cartProduct).toContainText(ProductText);
  await page.close();

});