# Ecare Web Application & Admin Dashboard

A premium, high-integrity bilingual web application and admin dashboard built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Ecare supports fully integrated English (`en`) and Bengali (`bn`) locales via `next-intl` and connects to **MongoDB** using Mongoose for dynamic content updates, while maintaining static fallback capability via **Velite** markdown collections.

---

## 🚀 Technology Stack

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & View Engine**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database / ODM**: [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Internationalization (i18n)**: [next-intl 4](https://next-intl-docs.vercel.app/)
- **Content Bundling (Static fallback)**: [Velite](https://velite.js.org/)
- **Utility Libraries**: `lucide-react`, `@radix-ui`

---

## ✨ Features

### 1. Unified Bilingual Content Editor
Administrators can create and edit English (`en`) and Bengali (`bn`) content concurrently in a single screen using clean, interactive layout tabs:
- **Blogs**: Write articles bilingually with SEO metadata tags, automatic authoring based on session profile, and custom category tags.
- **Products**: Manage digital assets, custom software, and application redirects. Includes custom pricing fields, loop video links, and dynamic categories.
- **Team**: Standardized bilingual profile management for designations, avatars, social links, and skills.
- **Testimonial**: Unified bilingual client reviews supporting rating counters and video player options.

### 2. Premium Custom Dropdowns
Replaced standard browser-native dropdown selects with a custom-engineered UI component:
- **Aesthetic**: Integrated backdrop blurs (`backdrop-blur-md`), smooth scale-up transitions, glowing red active borders, and distinct status checkmarks.
- **Language-Aware**: Dynamically translates options (e.g., product/blog categories) inline relative to the active translation editing panel tab.

### 3. Dynamic Category Management
A full-fledged, bilingual Category Management Panel allowing administrators to classify Blogs and Products dynamically.

### 4. Admin Authentication & Activity
Secure cookie-based administrator authentication maps logged-in usernames directly to author references, completely removing manual "Author Slug" fields.

---

## 🛠️ Local Getting Started

### Prerequisites

Make sure you have Node.js (v18.x or above) installed on your system.

### Installation

1. Clone the repository and navigate to the directory:
   ```bash
   cd ecare
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Configure your environmental variables inside a local `.env` or `.env.local` file (this file is ignored by Git to keep credentials secure):
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecare
   JWT_SECRET=your_jwt_secret_token
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=secure_admin_password
   ```

---

## ⚡ Deployment to Vercel

To deploy this project to Vercel securely:

1. Import your GitHub repository into your Vercel Dashboard.
2. In the **Environment Variables** section of the Vercel project settings, add the following variables:
   - `MONGODB_URI`: Your MongoDB Atlas Connection String.
   - `JWT_SECRET`: A secure random string for JWT.
   - `ADMIN_USERNAME`: Admin login username.
   - `ADMIN_PASSWORD`: Admin login password.
3. Vercel will automatically detect Next.js settings and build the dynamic web app.
4. **Important**: Since dynamic routes and MongoDB operations require real-time execution, make sure Vercel Functions are configured to the correct region matching your database cluster.

---

## 🏃 Run Commands

### Development Server
Run the local next development environment:
```bash
npm run dev
```

### Build Production Bundle
Compile the Next.js application for deployment:
```bash
npm run build
```

### Static Content Compilation
If you add or update markdown files inside the static `content/` directories, rebuild the Velite metadata cache:
```bash
npx velite
```

### TypeScript Validation
Verify types and catch compiler warnings:
```bash
npx tsc --noEmit
```
