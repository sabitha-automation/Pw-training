
// tests/login.e2e.spec.js
import { test } from '../fixtures/base.fixtures.js';
import testData from '../data/testData.json' assert { type: 'json' };
import * as allure from 'allure-js-commons';

  test('valid user can login and see products page', async ({loginActions, loginValidations }) => {
    allure.owner('Sabitha Narasimman');
    allure.severity('critical');               // blocker | critical | normal | minor | trivial
    allure.tag('smoke','login', 'saucedemo');
    allure.description('Valid login should navigate to inventory.html and show Products title');

    const { username, password } = testData.validUser;

    await test.step('Open login page', async () => {
      await loginActions.openLoginPage();
      await loginValidations.assertOnLoginPage();
    });

    await test.step(`Login as ${username}`, async () => {
      await loginActions.login(username, password);
    });

    await test.step('Verify Products page', async () => {
      await loginValidations.assertLoggedIn();
    });
  });

  test('invalid user sees error message', async ({ page, loginActions, loginValidations }, testInfo) => {
    allure.owner('Sabitha');
    allure.severity('normal');
    allure.tag('sanity', 'login-negative');

    const { username, password } = testData.invalidUser;


    await test.step('Open login page', async () => {
      await loginActions.openLoginPage();
      await loginValidations.assertOnLoginPage();
    });

    await test.step('Try invalid credentials', async () => {
      await loginActions.login(username, password);
    });

    await test.step('Verify error message', async () => {
      await loginValidations.assertErrorContains('Epic sadface');
    });
  });
