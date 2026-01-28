# Deployment Guide - Portfolio Website

This project is configured to deploy to **Firebase Hosting** at [https://alfahadniloy.web.app](https://alfahadniloy.web.app).

## Prerequisites

- Node.js installed
- Firebase CLI installed (`npm install -g firebase-tools`)
- Logged in to Firebase (`firebase login`)
- Access to the `alfahadniloy-61bbe` project

## Quick Deploy (Recommended)

This command builds the Next.js app (static export) and deploys it to the correct Firebase target.

```bash
npm run deploy
```

## Manual Steps

If you need to run steps separately:

1. **Build the Project**
   Generates the static files in the `out/` directory.

   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   Uploads the `out/` directory to the live site.

   ```bash
   firebase deploy --only hosting
   ```

## Configuration Files

- **`firebase.json`**: Configures the hosting behavior (public folder, rewrites).
- **`.firebaserc`**: Maps the `default` project alias and the `portfolio` deploy target to the specific site `alfahadniloy`.
- **`next.config.ts`**: Set to `output: 'export'` to generate static HTML/CSS/JS compatible with Firebase Hosting.

## Troubleshooting

- **Wrong URL?** Ensure `.firebaserc` targets `alfahadniloy`, not the default `alfahadniloy-61bbe` site.
- **Permission Denied?** Run `firebase login` again to refresh credentials.
