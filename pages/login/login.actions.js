
// pages/login/login.actions.js
export class LoginActions {
  constructor(page, locators) {
    this.page = page;
    this.l = locators;
  }

  async goto() {
    // baseURL must be set in playwright.config
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.page.locator(this.l.username).fill(username);
    await this.page.locator(this.l.password).fill(password);
    await this.page.locator(this.l.loginButton).click();
  }
}
``
