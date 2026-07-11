const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
// cPanel Node.js App usually passes the port via process.env.PORT
const port = process.env.PORT || 3000;

const fs = require('fs');
const { execSync } = require('child_process');

// Auto-build if .next directory is missing (useful for cPanel deployments)
if (!fs.existsSync('.next')) {
  console.log('.next folder not found. Running production build...');
  try {
    // We execute npm run build. cPanel's node environment has npm in PATH.
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Build finished successfully!');
  } catch (error) {
    console.error('Build failed:', error);
  }
}

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
