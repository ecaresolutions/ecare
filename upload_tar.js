const fs = require('fs');

(async () => {
  console.log('Preparing file upload via UAPI...');
  
  const filePath = 'build_dirs.tar.gz';
  const fileStream = fs.createReadStream(filePath);
  
  const formData = new FormData();
  formData.append('dir', '/home/ecare/beta.ecare.com.bd');
  
  const fileStats = fs.statSync(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const fileBlob = new Blob([fileBuffer], { type: 'application/gzip' });
  formData.append('file-0', fileBlob, 'build_dirs.tar.gz');

  console.log(`Uploading ${filePath} (${(fileStats.size / 1024 / 1024).toFixed(2)} MB) to /home/ecare/beta.ecare.com.bd...`);
  
  const authHeader = 'Basic ' + Buffer.from('ecare:dJ72$&Bmy#6gTMT4P').toString('base64');
  
  const response = await fetch('https://ecare.com.bd:2083/execute/Fileman/upload_files', {
    method: 'POST',
    headers: {
      'Authorization': authHeader
    },
    body: formData
  });
  
  console.log('Response Status:', response.status);
  const json = await response.json();
  console.log('Response JSON:', JSON.stringify(json, null, 2));
})().catch(err => {
  console.error('Error during upload:', err);
  process.exit(1);
});
