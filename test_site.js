const http = require('https');

console.log('Sending request to https://ecare-eight.vercel.app/ ...');
const req = http.get('https://ecare-eight.vercel.app/', (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', res.headers);
  process.exit(0);
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
  process.exit(1);
});

req.end();
