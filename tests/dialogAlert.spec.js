import { test } from '../fixtures/base.fixtures.js';
const { expect } = test;

  
test("Verify Dialog Alert", async ({ page }) => {
 
  const url = "https://testautomationpractice.blogspot.com/";
  await page.goto(url);
  //simple Alert
  //page.on('dialog', dialog => dialog.accept());
  //await page.getByRole('button', {name: "Simple Alert"}).click();

  
  //page.on('dialog', dialog => dialog.dismiss());
  //await page.getByRole('button', {name: "Confirmation Alert"}).click();

  await page.getByRole('button', {name: "Prompt Alert"}).click();
  page.on('dialog', dialog => {
    dialog.type('sabitha narasimman');
    dialog.accept();
  });
});


  