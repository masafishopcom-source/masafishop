# Masafishop Deployment and Configuration Guide

I have fixed the issues you mentioned. Since I cannot directly update your Vercel environment variables for security reasons, please follow these steps to apply the fixes:

## 1. Update Vercel Environment Variables
Go to your [Vercel Dashboard](https://vercel.com) and update/add the following environment variables using the credentials you provided:

### Google Authentication
- `AUTH_GOOGLE_ID`: (Use the Client ID you provided)
- `AUTH_GOOGLE_SECRET`: (Use the Client Secret you provided)
- `AUTH_SECRET`: (Generate a random secret if not already present, e.g., using `openssl rand -base64 32`)

### Cloudinary Image Upload
The code has been updated to use Cloudinary. Please add these environment variables in Vercel:
- `CLOUDINARY_CLOUD_NAME`: `pqvdu6bo`
- `CLOUDINARY_API_KEY`: `472283955514275`
- `CLOUDINARY_API_SECRET`: (Use the API Secret you provided)

## 2. Push Changes to GitHub
I have already updated the code in the local environment. Please push these changes to your repository:
```bash
git add .
git commit -m "Fix: Image upload, Google Auth, and Homepage Customization"
git push origin main
```

## 3. Fixed Issues
1. **Homepage Customization**: Added a direct link "Homepage Customization" to the Admin Sidebar that points to `/admin/system-design`.
2. **Google Login**: Configured `auth.config.ts` to use the provided Google Client ID and Secret via environment variables.
3. **Image Upload**: Replaced the broken ImgBB integration with Cloudinary. I have installed the `cloudinary` npm package and updated `/api/upload/route.ts`.

## 4. Verification
After deploying:
- Go to **Admin Panel** -> **Homepage Customization** to change your site's look.
- Try **Google Login** on the login page.
- Try **uploading a product image** or a banner in the admin panel to verify Cloudinary is working.
