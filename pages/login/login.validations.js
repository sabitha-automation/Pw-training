
// pages/login/login.validations.js
import { expect } from '@playwright/test';

export class LoginValidations {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {{ [key: string]: string }} locators  // strings
   */
  constructor(page, locators) {
    this.page = page;
    this.l = locators;
  }

  async assertOnLoginPage() {
    await expect(this.page.locator(this.l.loginButton)).toBeVisible();
  }

  async assertLoggedIn() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.page.locator(this.l.productsTitle)).toHaveText('Products');
  }

  async assertErrorContains(text) {
    await expect(this.page.locator(this.l.error)).toContainText(text);
  }
}
