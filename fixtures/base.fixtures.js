
// fixtures/base.fixtures.js
import { test as base } from '@playwright/test';
import { LoginLocators } from '../pages/login/login.locators.js';
import { LoginActions } from '../pages/login/login.actions.js';
import { LoginValidations } from '../pages/login/login.validations.js';

export const test = base.extend({
  locators: async ({}, use) => {
    const loc = new LoginLocators();   
    await use(loc);
  },

  loginActions: async ({ page, locators }, use) => {
    await use(new LoginActions(page, locators));
  },

  loginValidations: async ({ page, locators }, use) => {
    await use(new LoginValidations(page, locators));
  },
});

export const expect = test.expect;
