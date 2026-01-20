
// tests/login.e2e.spec.js
import { test } from '../fixtures/base.fixtures.js';
import testData from '../data/testData.json' assert { type: 'json' };
import * as allure from 'allure-js-commons';

const { expect } = test;

test.describe('Login - E2E (SauceDemo)', () => {
  test('valid user can login and see products page', async ({ page, loginActions, loginValidations }, testInfo) => {
    await allure.owner('Sabitha');
    await allure.severity('critical');               // blocker | critical | normal | minor | trivial
    await allure.tag('smoke', 'e2e', 'login', 'saucedemo');
    await allure.description('Valid login should navigate to inventory.html and show Products title');

    const { username, password } = testData.validUser;

    await test.step('Open login page', async () => {
      await loginActions.goto();
      await loginValidations.assertOnLoginPage();
    });

    await test.step(`Login as ${username}`, async () => {
      await loginActions.login(username, password);
    });

    await test.step('Verify Products page', async () => {
      await loginValidations.assertLoggedIn();
    });

    // Attach final screenshot to the test
    const shot = await page.screenshot({ fullPage: true });
    await testInfo.attach('End state', { body: shot, contentType: 'image/png' });
  });

  test('invalid user sees error message', async ({ page, loginActions, loginValidations }, testInfo) => {
    await allure.owner('Sabitha');
    await allure.severity('normal');
    await allure.tag('sanity', 'e2e', 'login-negative');

    await test.step('Open login page', async () => {
      await loginActions.goto();
      await loginValidations.assertOnLoginPage();
    });

    await test.step('Try invalid credentials', async () => {
      await loginActions.login('locked_out_user', 'bad_password');
    });

    await test.step('Verify error message', async () => {
      await loginValidations.assertErrorContains('Epic sadface');
    });

    // Attach screenshot on negative flow as well
    await testInfo.attach('Error state', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });
});
