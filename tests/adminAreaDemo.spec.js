import { test } from '../fixtures/base.fixtures.js';

test('Open Login page', async ({ page }) => {
    await page.goto('https://admin-demo.nopcommerce.com');
    await page.locator('input[name="Email"]').clear()
    await page.locator('input[name="Email"]').fill('admin@yourstore.com');
    await page.locator('#Password').clear()
    await page.locator('#Password').fill('admin');
    await page.locator('button[type="submit"]').click();
})
