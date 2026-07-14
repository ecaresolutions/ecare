const authHeader = 'Basic ' + Buffer.from('ecare:dJ72$&Bmy#6gTMT4P').toString('base64');
const serverDir = '/home/ecare/beta.ecare.com.bd';

async function callUAPI(functionName, params) {
  const response = await fetch(`https://ecare.com.bd:2083/execute/Fileman/${functionName}`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(params)
  });
  return response.json();
}

(async () => {
  // Step 1: Read current server.js from server
  console.log('Reading server.js from server...');
  const fileRes = await callUAPI('get_file_content', {
    dir: 'beta.ecare.com.bd',
    file: 'server.js'
  });
  
  if (!fileRes.data || !fileRes.data.content) {
    throw new Error('Failed to read server.js from server: ' + JSON.stringify(fileRes));
  }
  
  const originalServerJs = fileRes.data.content;
  console.log('Successfully read server.js. Backing up to server.js.bak on server...');
  
  // Save backup
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd',
    file: 'server.js.bak',
    content: originalServerJs
  });
  
  // Step 2: Write temporary extractor server.js
  const extractorJs = `
const { execSync } = require('child_process');
const fs = require('fs');

console.log('--- STARTING ZIP EXTRACTION ON SERVER ---');
try {
  if (fs.existsSync('build_dirs.zip')) {
    console.log('build_dirs.zip found, extracting...');
    execSync('unzip -o build_dirs.zip', { stdio: 'inherit' });
    console.log('Extraction completed successfully!');
  } else {
    console.log('build_dirs.zip not found!');
  }
} catch (error) {
  console.error('Extraction failed:', error);
}
console.log('--- ZIP EXTRACTION FINISHED ---');

// Keep a dummy server running so Passenger doesn't crash repeatedly immediately
const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Extraction running or completed. Check logs.');
}).listen(process.env.PORT || 3000);
`;

  console.log('Writing temporary extractor to server.js...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd',
    file: 'server.js',
    content: extractorJs
  });
  
  // Step 3: Trigger restart
  console.log('Triggering restart via tmp/restart.txt...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd/tmp',
    file: 'restart.txt',
    content: Date.now().toString()
  });
  
  // Wait for the app to wake up and perform extraction
  console.log('Waiting 15 seconds for extraction to execute...');
  await new Promise(resolve => setTimeout(resolve, 15000));
  
  // Make a request to the web page to trigger passenger spin up
  console.log('Pinging the subdomain to wake up passenger...');
  try {
    await fetch('http://beta.ecare.com.bd/', { signal: AbortSignal.timeout(5000) });
  } catch (e) {
    console.log('Ping request completed/timeout (expected if app is extracting):', e.message);
  }
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Step 4: Check logs
  console.log('Reading stderr.log to verify extraction...');
  const logRes = await callUAPI('get_file_content', {
    dir: 'beta.ecare.com.bd',
    file: 'stderr.log'
  });
  
  if (logRes.data && logRes.data.content) {
    const lines = logRes.data.content.split('\n');
    console.log('--- Last 20 lines of stderr.log ---');
    console.log(lines.slice(-20).join('\n'));
  } else {
    console.log('No stderr.log found or empty.');
  }
  
  // Step 5: Restore original server.js
  console.log('Restoring original server.js...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd',
    file: 'server.js',
    content: originalServerJs
  });
  
  // Trigger restart again
  console.log('Triggering final restart...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd/tmp',
    file: 'restart.txt',
    content: Date.now().toString()
  });
  
  // Clean up zip and backup on server using API2 fileop (op=unlink)
  console.log('Cleaning up build_dirs.zip and server.js.bak on server...');
  await fetch('https://ecare.com.bd:2083/json-api/cpanel', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      cpanel_jsonapi_apiversion: '2',
      cpanel_jsonapi_module: 'Fileman',
      cpanel_jsonapi_func: 'fileop',
      op: 'unlink',
      sourcefiles: '/home/ecare/beta.ecare.com.bd/build_dirs.zip',
      doubledecode: '1'
    })
  });
  
  await fetch('https://ecare.com.bd:2083/json-api/cpanel', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      cpanel_jsonapi_apiversion: '2',
      cpanel_jsonapi_module: 'Fileman',
      cpanel_jsonapi_func: 'fileop',
      op: 'unlink',
      sourcefiles: '/home/ecare/beta.ecare.com.bd/server.js.bak',
      doubledecode: '1'
    })
  });
  
  console.log('Deployment procedure completed!');
})().catch(err => {
  console.error('Error during deployment execution:', err);
  process.exit(1);
});
