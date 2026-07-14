const fs = require('fs');

const authHeader = 'Basic ' + Buffer.from('ecare:dJ72$&Bmy#6gTMT4P').toString('base64');
const serverRoot = '/home/ecare/beta.ecare.com.bd';

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

async function callAPI2(moduleName, functionName, params) {
  const response = await fetch('https://ecare.com.bd:2083/json-api/cpanel', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      cpanel_jsonapi_apiversion: '2',
      cpanel_jsonapi_module: moduleName,
      cpanel_jsonapi_func: functionName,
      ...params
    })
  });
  return response.json();
}

(async () => {
  // Step 1: Upload build_dirs.zip
  const filePath = 'build_dirs.zip';
  console.log(`Uploading ${filePath} via UAPI...`);
  
  const fileStats = fs.statSync(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const fileBlob = new Blob([fileBuffer], { type: 'application/zip' });
  
  const formData = new FormData();
  formData.append('dir', serverRoot);
  formData.append('file-0', fileBlob, 'build_dirs.zip');
  
  const uploadRes = await fetch('https://ecare.com.bd:2083/execute/Fileman/upload_files', {
    method: 'POST',
    headers: {
      'Authorization': authHeader
    },
    body: formData
  });
  
  console.log('Upload Status:', uploadRes.status);
  const uploadJson = await uploadRes.json();
  console.log('Upload Result:', JSON.stringify(uploadJson, null, 2));
  
  // Step 2: Delete old build_dirs.tar.gz from server
  console.log('Cleaning up old build_dirs.tar.gz from server...');
  await callAPI2('Fileman', 'fileop', {
    op: 'unlink',
    sourcefiles: `${serverRoot}/build_dirs.tar.gz`,
    doubledecode: '1'
  });
  
  // Step 3: Extract build_dirs.zip on server
  console.log('Extracting build_dirs.zip on server via API2...');
  const extractRes = await callAPI2('Fileman', 'fileop', {
    op: 'extract',
    sourcefiles: `${serverRoot}/build_dirs.zip`,
    doubledecode: '1'
  });
  console.log('Extract Result:', JSON.stringify(extractRes, null, 2));
  
  // Step 4: Delete build_dirs.zip from server
  console.log('Cleaning up build_dirs.zip from server...');
  await callAPI2('Fileman', 'fileop', {
    op: 'unlink',
    sourcefiles: `${serverRoot}/build_dirs.zip`,
    doubledecode: '1'
  });
  
  // Step 5: Touch restart.txt to restart Node app
  console.log('Triggering Node.js application restart...');
  await callUAPI('save_file_content', {
    dir: 'beta.ecare.com.bd/tmp',
    file: 'restart.txt',
    content: Date.now().toString()
  });
  
  console.log('Deployment complete!');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
