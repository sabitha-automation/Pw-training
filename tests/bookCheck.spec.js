import { test } from '../fixtures/base.fixtures.js';
const { expect } = test;

  
test("Verify Row and Validate cells", async ({ page }) => {
 
  const url = "https://testautomationpractice.blogspot.com/";
 
  await page.goto(url);
  const table = page.locator('table').first();
  const row = table.locator('tbody tr', {hasText: 'Learn Selenium'})
  const author = await row.locator('td').nth(1).textContent();
  const price = await row.locator('td').nth(3).textContent();
  console.log(author)
  console.log(price)
  await expect((row.locator('td').nth(1)).textContent('Amith'))
})
