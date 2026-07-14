const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to cPanel...');
  await page.goto('https://ecare.com.bd:2083/', { waitUntil: 'networkidle' });
  
  console.log('Logging in...');
  await page.fill('#user', 'ecare');
  await page.fill('#pass', 'dJ72$&Bmy#6gTMT4P');
  await page.click('#login_submit');
  await page.waitForNavigation({ waitUntil: 'networkidle' });
  
  const cpsess = page.url().match(/cpsess\d+/)[0];
  console.log('Session ID:', cpsess);
  
  const uploadUrl = `https://ecare.com.bd:2083/${cpsess}/frontend/jupiter/filemanager/upload.html?dir=/home/ecare/beta.ecare.com.bd`;
  console.log('Navigating to upload page:', uploadUrl);
  await page.goto(uploadUrl, { waitUntil: 'networkidle' });
  
  console.log('Uploading build_dirs.zip...');
  // File input selector on cPanel upload page is typically input[type=file]
  const fileInput = await page.locator('input[type=file]');
  await fileInput.setInputFiles(path.join(__dirname, 'build_dirs.zip'));
  
  console.log('Waiting for upload to complete...');
  // The page shows progress. We can wait for "100%" or similar success indicator, or wait until the upload queue is empty.
  // Typically, there is an element with class "el-upload-list__item" or a progress bar, or text like "complete".
  // Let's wait for a few minutes or poll the upload status.
  await page.waitForTimeout(10000); // Wait 10 seconds initially
  
  // Let's print out text content of body to monitor progress
  for (let i = 0; i < 30; i++) {
    const text = await page.evaluate(() => document.body.innerText);
    console.log(`Progress check ${i+1}:`);
    if (text.includes('100%') || text.includes('complete') || text.includes('Success')) {
      console.log('Upload seems complete!');
      break;
    }
    // Print lines containing percentage
    const progressLines = text.split('\n').filter(line => line.includes('%') || line.includes('zip'));
    console.log(progressLines.join(' | '));
    await page.waitForTimeout(15000); // check every 15s
  }
  
  console.log('Done!');
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
