import { test } from '../fixtures/base.fixtures.js';
const { expect } = test; 

test('WebSocket demo using PieSocket', async ({ page }) => {
 
  // Listen for WebSocket connections like when website opens the websocket it calls "event listener"
  page.on('websocket', ws => {
    console.log('WebSocket opened:', ws.url());
 
    ws.on('framesent', frame => {
      console.log('Sent:', frame.payload);
    });
 
    // Listen for messages sent from the server to the page/browser
    ws.on('framereceived', frame => {
      console.log('Received:', frame.payload);
    });
 
    ws.on('close', () => {  
      console.log('WebSocket closed');
    });
 
    ws.on('socketerror', error => {  
      console.log('WebSocket error:', error);
    });
  });
 
  // Open the PieSocket tester ws demo website
  await page.goto('https://www.piesocket.com/websocket-tester');
 
  await page.getByPlaceholder('wss://').fill('wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self');
 
  // Click Connect it is an trigger point where actual ws will opens/starts here i.e; page.on("websocket")
  await page.locator('button:has-text("Connect")').click();
  await page.waitForTimeout(3000);
 
  await page.getByPlaceholder('Enter message').fill('Nithu');
 
  await page.click('text=Send');
 
  await page.waitForTimeout(3000);
});
 