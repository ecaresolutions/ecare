const authHeader = 'Basic ' + Buffer.from('ecare:dJ72$&Bmy#6gTMT4P').toString('base64');

(async () => {
  console.log('Extracting build_dirs.tar.gz on server via cPanel API2...');
  const res = await fetch('https://ecare.com.bd:2083/json-api/cpanel', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      cpanel_jsonapi_apiversion: '2',
      cpanel_jsonapi_module: 'Fileman',
      cpanel_jsonapi_func: 'fileop',
      op: 'extract',
      sourcefiles: '/home/ecare/beta.ecare.com.bd/build_dirs.tar.gz',
      doubledecode: '1'
    })
  });
  
  const result = await res.json();
  console.log('API2 Extract Result:', JSON.stringify(result, null, 2));
})().catch(err => {
  console.error(err);
  process.exit(1);
});
