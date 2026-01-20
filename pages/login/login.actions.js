import * as allure from 'allure-js-commons';

// pages/login/login.actions.js
export class LoginActions {
  constructor(page, locators) {
    this.page = page;
    this.l = locators;
  }

  async openLoginPage() {
    // baseURL must be set in playwright.config
    await this.page.goto('/');
    // Attach screenshot to Allure
    const shot = await this.page.screenshot({ fullPage: true });
    allure.attachment('Open login page - screenshot', shot, 'image/png');
  }

  async login(username, password) {
    await this.page.locator(this.l.username).fill(username);
    await this.page.locator(this.l.password).fill(password);
    await this.page.locator(this.l.loginButton).click();
    // Attach screenshot to Allure
    const shot = await this.page.screenshot();
    allure.attachment('After Login click - screenshot', shot, 'image/png');
  }
}

