import { request } from '@playwright/test';
// scripts/get-post.js
const { request } = require('@playwright/test');

(async () => {
  // 1) Console first
  console.log('[start] Fetching post #1 from JSONPlaceholder');

  // 2) Create an API client
  const api = await request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

  try {
    // 3) GET /posts/1
    const res = await api.get('/posts/1');

    // 4) Check status (simple validation)
    if (!res.ok()) {
      throw new Error(`Request failed: ${res.status()} ${res.statusText()}`);
    }

    // 5) Parse JSON and log
    const post = await res.json();
    console.log('[ok] Status:', res.status());
    console.log('[data]', JSON.stringify(post, null, 2));
    console.log('[title]', post.title);

  } catch (err) {
    console.error('[error]', err);
    process.exitCode = 1;
  } finally {
    await api.dispose();
  }
})();
