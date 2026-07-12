# Deployment Guide for Next.js on cPanel

This guide provides step-by-step instructions to deploy this Next.js project on a cPanel hosting server using the **Setup Node.js App** (Phusion Passenger / CloudLinux) feature.

---

## Prerequisites
- **cPanel access** with Node.js support enabled.
- **Node.js Version**: **20.x** or **22.x** (Node 22 is recommended).
- **Domain/Subdomain**: Configured and pointing to the target folder on cPanel (e.g., `mother.ecarehost.com`).

---

## Step 1: Uploading Files to cPanel

1. Compress your project files into a `.zip` archive.
   - **Do NOT** include `node_modules`, `.next`, `.git`, or local environment files (`.env.local` or `.env.development`).
2. Log into cPanel, open **File Manager**, and navigate to your home directory (e.g., `/home/username/`).
3. Create a new directory named `mother-app` (or any name you choose) under `/home/username/`.
4. Upload the `.zip` archive into this directory and extract its contents.

---

## Step 2: Configure the Node.js Application in cPanel

1. In cPanel, search for and open **Setup Node.js App**.
2. Click **Create Application**.
3. Fill in the configuration details:
   - **Node.js version**: Select **22.x** or **20.x** (Matching your local development).
   - **Application mode**: Select **Production**.
   - **Application root**: Type `mother-app` (the name of the directory where you extracted the files).
   - **Application URL**: Select your subdomain/domain (e.g., `mother.ecarehost.com`).
   - **Application startup file**: Type `server.js` (this acts as the custom Next.js production server).
4. Click the **Create** button.

---

## Step 3: Run Package Installation and Build

1. Once the application is created, scroll down to the **Detected configuration files** section.
2. Click **Run NPM Install** to install production dependencies.
3. Once dependencies are installed, you need to build the project. There are two ways to do this:

### Option A: Automatic Build (Recommended)
Our custom `server.js` is programmed to automatically run `npm run build` when the app starts if it detects that the `.next` folder is missing. 
- Simply visit your subdomain (e.g. `http://mother.ecarehost.com`) in your browser. 
- The initial load will take 1-2 minutes while it builds in the background. Subsequent loads will be instant.

### Option B: Build via SSH Terminal
If you have SSH access, copy the virtual environment activation command shown at the top of the **Setup Node.js App** page.
Run the command in your terminal, then compile the app:
```bash
source /home/username/nodevenv/mother-app/22/bin/activate && cd /home/username/mother-app
npm run build
```

---

## Step 4: Environment Variables Configuration

To load environment variables (like Database URIs, API keys, etc.) on cPanel:
1. In the **Setup Node.js App** page, scroll down to **Environment variables**.
2. Add your environment keys and values:
   - **Key**: `MONGODB_URI` | **Value**: *Your MongoDB connection string*
   - **Key**: `NODE_ENV` | **Value**: `production`
3. Click **Save** and restart the app.

---

## Step 5: Handling LiteSpeed/Passenger Path Configurations (Troubleshooting 503 Errors)

If your hosting provider runs **LiteSpeed Web Server** and you get a **503 Service Unavailable** error with the log `lscgid: execve():/usr/bin/node: No such file or directory`:

This happens when the host has not symlinked the global Node binary. You can easily bypass this by telling LiteSpeed to proxy requests directly to the Node.js application running on a custom port.

1. Open your domain root folder in **File Manager** (e.g., `/home/username/mother.ecarehost.com/`).
2. Edit or create the `.htaccess` file and add the following proxy rules:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
   ```
   *(Change `3000` to the port configuration your app runs on if customized in server.js/cPanel environment).*
