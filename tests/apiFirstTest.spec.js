
// tests/apiFirstTest.spec.js
import { test } from '../fixtures/base.fixtures.js';
const { expect } = test;

test('example ignoring HTTPS errors', async ({ browser }) => {
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();
  await page.goto('https://jsonplaceholder.typicode.com/comments?postId=1');
  
  console.log(await page.title());
});


test('first console then GET /posts/1', async ({ request }, testInfo) => {
  console.log('Starting API test: GET /posts/1');
  const res = await request.get('https://jsonplaceholder.typicode.com/comments?postId=1');
  expect(res.ok()).toBeTruthy();
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toMatchObject({
    userId: expect.any(Number),
    id: 1,
    title: expect.any(String),
    body: expect.any(String),
  });

  await testInfo.attach('GET /posts/1 response', {
    body: JSON.stringify(body, null, 2),
    contentType: 'application/json',
  });

  console.log('Received post title:', body.title);
});

