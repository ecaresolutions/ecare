const { chromium } = require('@playwright/test');

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
  
  const listFiles = await page.evaluate(async (cpsess) => {
    const res = await fetch(`/${cpsess}/execute/Fileman/list_files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        dir: 'beta.ecare.com.bd',
        showhidden: 1
      })
    });
    return res.json();
  }, cpsess);
  
  console.log('Files list with modification times and sizes:');
  if (listFiles.data) {
    listFiles.data.forEach(f => {
      // Convert unix timestamp to readable date (if available) or print as is
      console.log(`- ${f.file} (${f.type}, size: ${f.size}, mtime: ${f.mtime})`);
    });
  } else {
    console.log('Error listing:', listFiles);
  }
  
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
