const authHeader = 'Basic ' + Buffer.from('ecare:dJ72$&Bmy#6gTMT4P').toString('base64');

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
    throw new Error('Failed to read server.js: ' + JSON.stringify(fileRes));
  }
  
  const originalServerJs = fileRes.data.content;
  console.log('Successfully read server.js. Backing up to server.js.bak...');
  
  // Save backup
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd',
    file: 'server.js.bak',
    content: originalServerJs
  });
  
  // Step 2: Write temporary extractor server.js with verbose tar extraction
  const extractorJs = `
const http = require('http');
const { execSync } = require('child_process');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.write('Starting extraction procedure...\\n');
  
  try {
    process.chdir(__dirname);
    res.write('Changed directory to ' + __dirname + '\\n');
    
    res.write('Cleaning old folders...\\n');
    fs.rmSync('.next', { recursive: true, force: true });
    fs.rmSync('.velite', { recursive: true, force: true });
    res.write('Clean complete.\\n');
    
    if (fs.existsSync('build_dirs.tar.gz')) {
      res.write('build_dirs.tar.gz found. Extracting with verbose output...\\n');
      const output = execSync('tar --no-same-owner -xzvf build_dirs.tar.gz 2>&1');
      res.write('Extraction complete!\\nOutput:\\n' + output.toString() + '\\n');
    } else {
      res.write('build_dirs.tar.gz not found!\\n');
    }
  } catch (err) {
    res.write('Error: ' + err.message + '\\nStack: ' + err.stack + '\\n');
  }
  
  res.end('All done!\\n');
});

server.listen(process.env.PORT || 3000);
`;

  console.log('Writing temporary extractor to server.js...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd',
    file: 'server.js',
    content: extractorJs
  });
  
  // Step 3: Trigger restart
  console.log('Triggering restart...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd/tmp',
    file: 'restart.txt',
    content: Date.now().toString()
  });
  
  console.log('Waiting 5 seconds...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('Pinging the subdomain via HTTPS to trigger extraction...');
  let extractionResponseText = '';
  try {
    const res = await fetch('https://beta.ecare.com.bd/', { 
      signal: AbortSignal.timeout(45000) 
    });
    console.log('HTTP Status:', res.status);
    extractionResponseText = await res.text();
    console.log('--- Extraction Execution Logs ---');
    console.log(extractionResponseText.substring(0, 2000)); // print first 2000 chars of files extracted
    if (extractionResponseText.length > 2000) {
      console.log('... [Truncated for length] ...');
      console.log(extractionResponseText.substring(extractionResponseText.length - 500)); // print last 500 chars
    }
    console.log('---------------------------------');
  } catch (e) {
    console.log('Ping failed or timed out:', e.message);
  }
  
  // Step 4: Verify if .next exists using UAPI
  console.log('Verifying .next folder presence on server...');
  const listRes = await callUAPI('list_files', {
    dir: 'beta.ecare.com.bd',
    showhidden: '1'
  });
  
  let nextFolderExists = false;
  if (listRes.data) {
    const folders = listRes.data.map(f => f.file);
    nextFolderExists = folders.includes('.next');
  }
  console.log('Verification: does .next exist now?', nextFolderExists);
  
  // Step 5: Restore original server.js
  console.log('Restoring original server.js...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd',
    file: 'server.js',
    content: originalServerJs
  });
  
  // Trigger final restart
  console.log('Triggering final restart...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd/tmp',
    file: 'restart.txt',
    content: Date.now().toString()
  });
  
  // Clean up tar.gz and backup on server using API2 fileop (op=unlink)
  console.log('Cleaning up build_dirs.tar.gz and server.js.bak on server...');
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
      sourcefiles: '/home/ecare/beta.ecare.com.bd/build_dirs.tar.gz',
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
