import { test } from '../fixtures/base.fixtures.js';


test('fails if overlay covers page', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/entry_ad');
    const modal = page.locator('#modal');
    if (await modal.isVisible()) {
        await modal.getByText('Close', { exact: true }).click();
        await modal.waitFor({ state: 'hidden' }); // ensure it's gone
    }

  // Immediately try to click "Elemental Selenium" footer link (covered by the modal)
    const link = page.getByRole('link', { name: 'Elemental Selenium' })// ❌ may fail: element not visible / covered
    await link.isVisible();
    await link.click();
    });

