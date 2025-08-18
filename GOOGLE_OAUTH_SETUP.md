# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your WhiteSpace blog application.

## Prerequisites

- A Google account
- Access to Google Cloud Console
- Your application running locally or deployed

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Click on "Select a project" at the top of the page
3. Click "New Project"
4. Enter a project name (e.g., "WhiteSpace Blog")
5. Click "Create"

## Step 2: Enable Google+ API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on "Google Identity" and then "Enable"

## Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type (unless you have a Google Workspace)
3. Fill in the required information:
   - **App name**: WhiteSpace
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Click "Save and Continue"
5. On the "Scopes" page, click "Save and Continue"
6. On the "Test users" page, add your email address as a test user
7. Click "Save and Continue"

## Step 4: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application" as the application type
4. Fill in the details:
   - **Name**: WhiteSpace Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
5. Click "Create"
6. **Copy the Client ID** - you'll need this for your environment variables

## Step 5: Configure Environment Variables

### Backend (.env file)
```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret_key"
GOOGLE_CLIENT_ID="your_google_client_id_here"
```

### Frontend (.env file)
Create a `.env` file in the frontend directory:
```env
VITE_GOOGLE_CLIENT_ID="your_google_client_id_here"
```

### Cloudflare Workers (wrangler.toml)
```toml
[vars]
DATABASE_URL = "your_postgresql_connection_string"
JWT_SECRET = "your_jwt_secret_key"
GOOGLE_CLIENT_ID = "your_google_client_id_here"
```

## Step 6: Update Database Schema

Run the database migration to add OAuth fields:

```bash
cd backend
npx prisma migrate dev --name add_oauth_fields
```

## Step 7: Test the Setup

1. Start your development servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

2. Go to `http://localhost:5173/signin`
3. Click the "Sign in with Google" button
4. Complete the Google OAuth flow
5. You should be redirected to the dashboard after successful authentication

## Troubleshooting

### Common Issues

1. **"Invalid Client ID" error**
   - Make sure your Google Client ID is correct
   - Check that the domain is added to authorized origins
   - Ensure the OAuth consent screen is configured

2. **"Redirect URI mismatch" error**
   - Add your exact domain to authorized redirect URIs
   - Include both `http://` and `https://` versions if needed

3. **"Access blocked" error**
   - Add your email to test users in OAuth consent screen
   - Make sure the Google+ API is enabled

4. **"Token verification failed" error**
   - Check that your backend environment variables are set correctly
   - Ensure the JWT_SECRET is properly configured

### Debug Steps

1. Check browser console for JavaScript errors
2. Check backend logs for authentication errors
3. Verify environment variables are loaded correctly
4. Test with a different browser or incognito mode

## Security Considerations

1. **Never commit your Client ID to version control**
   - Use environment variables
   - Add `.env` files to `.gitignore`

2. **Use HTTPS in production**
   - Google OAuth requires HTTPS for production domains
   - Update authorized origins accordingly

3. **Regularly rotate secrets**
   - Change JWT_SECRET periodically
   - Monitor for suspicious activity

4. **Validate tokens server-side**
   - Always verify Google tokens on the backend
   - Don't trust client-side token validation

## Production Deployment

When deploying to production:

1. Update authorized origins in Google Cloud Console
2. Add your production domain to redirect URIs
3. Update environment variables on your hosting platform
4. Test the OAuth flow in production environment

## Additional Features

### One Tap Sign-In
The application includes Google One Tap sign-in for better UX. Users will see a prompt to sign in without navigating away from your site.

### Automatic Account Linking
If a user signs up with email and later signs in with Google (or vice versa), the accounts will be automatically linked if they use the same email address.

### Profile Sync
Google profile information (name, avatar) is automatically synced when users sign in with Google.

## Support

If you encounter issues:

1. Check the Google Cloud Console for any error messages
2. Review the browser console and backend logs
3. Verify all environment variables are set correctly
4. Test with a fresh browser session

For more information, refer to:
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Identity Platform](https://developers.google.com/identity)
- [React OAuth Google Documentation](https://www.npmjs.com/package/@react-oauth/google)