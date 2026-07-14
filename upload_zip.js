const fs = require('fs');

const authHeader = 'Basic ' + Buffer.from('ecare:dJ72$&Bmy#6gTMT4P').toString('base64');
const serverRoot = '/home/ecare/beta.ecare.com.bd';

(async () => {
  const filePath = 'build_dirs.zip';
  console.log(`Uploading ${filePath} to ${serverRoot}...`);
  
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
  
  console.log('Upload complete!');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
