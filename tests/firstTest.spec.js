import { test } from '../fixtures/base.fixtures.js';
const { expect } = test;

test("Fill GUI Elements", async ({ page }) => {

  const url = "https://testautomationpractice.blogspot.com/";

  await page.goto(url);

  //Text Fields

  await page.getByPlaceholder("Enter Name").fill("Xyz");

  await page.getByRole('textbox', {name:'EMail'}).fill("xyz@gmail.com");
  
  await page.locator('input[id="phone"]').fill("4858345837");

  await page.getByLabel("Address:").fill("abc nagar, xcity");
 
  //Radio Buttons:

  await page.getByLabel("Female").check();
 
  //Checkboxes

  await page.locator("#sunday").click();

  await page.locator("#monday").click();

  await page.locator("#saturday").click();
 
  //Select dropdown by value attribute

  await page.selectOption("#country", "india");

  await page.selectOption("#colors", ["green", "blue"]);
 
  //Select dropdown by visble text

  await page.selectOption("#animals", [{ label: "Cat" }, { label: "Cheetah" }]);

  //DatePicker1

  let datePicker1 = "2 Janauary 2026";

  await page.locator("#datepicker").click();

  let day1 = datePicker1.split(" ")[0];

  await page.locator(`//a[text()='${day1}' and @class='ui-state-default']`).click();
 
  //Date Picker 2

  let datePicker2 = "25 Janauary 2026";

  await page.locator("#txtDate").click();

  let day2 = datePicker2.split(" ")[0];

  await page

    .locator(`//a[text()='${day2}'and @class='ui-state-default']`)

    .click();
 
  //Date Picker 3: (Select a Date Range)

  await page.getByPlaceholder("Start Date").fill("2026-01-14");

  await page.getByPlaceholder("End Date").fill("2026-01-15");

  await page

    .locator("//button[text()='Submit' and @class='submit-btn']")

    .click();

  expect(await page.locator("#result").textContent()).toBe(

    "You selected a range of 1 days."

  );

});

test("Playwright locators", async ({ page }) => {

  const url = "https://www.amazon.in/";

  await page.goto(url);
  await expect(page).toHaveURL(/amazon/);
  await page.getByPlaceholder('Search Amazon.in').fill('mobile stand for desk');
  await page.locator('input[type="submit"]').click();
  const Products = page.locator("div[role='listitem']");
  const count = await Products.count();
  const randomIndex = Math.floor(Math.random() * count)
  //const ProductText = (await Products.innerText()).split('\n')[1];;
  const ProductText = Products.nth(randomIndex).locator('button[aria-label="Add to cart"]')
  console.log(ProductText)
  await ProductText.first().click();
  await page.getByText('Go to Cart').click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('//*[@name="proceedToRetailCheckout"]')).toBeVisible();
  const cartProduct = page.locator('li[class="sc-item-product-title-cont"]').first()
  const cartProductText = (await cartProduct.innerText());
  console.log(cartProductText)
  await expect (cartProduct).toContainText(ProductText);
  await page.close();




});
 