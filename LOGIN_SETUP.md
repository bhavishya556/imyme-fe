# Login Page Setup Instructions

## Environment Variables

Create a `.env.local` file in your `imyme-fe` directory with the following variables:

```bash
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here

# API Configuration  
NEXT_PUBLIC_BASE_URI=http://localhost:3000
```

## Setup Steps

1. **Get Google OAuth Client ID:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Set authorized redirect URIs to include your domain
   - Copy the Client ID to your `.env.local` file

2. **Update API Base URL:**
   - For development: `http://localhost:3000` (or your backend port)
   - For production: `https://your-api-domain.com`

3. **Backend API Endpoints Required:**
   - `POST /api/v1/auth/google` - Google OAuth authentication
   - `GET /api/v1/auth/check-token` - Token validation
   - `POST /api/v1/auth/email` - Email/password login (optional)

## Features

✅ **Google OAuth Login** - Fully functional with your backend
✅ **Email/Password Form** - UI ready, backend integration needed
✅ **Auto Authentication Check** - Checks if user is already logged in
✅ **Responsive Design** - Works on mobile and desktop
✅ **Loading States** - Proper loading indicators
✅ **Error Handling** - User-friendly error messages

## Usage

1. Navigate to `/login` in your app
2. Click "Continue with Google" for OAuth login
3. Or fill in email/password form (requires backend implementation)
4. After successful login, user is redirected to `/my-webs`

## Customization

- Update the logo/branding in the login page
- Modify the redirect URL after login
- Add additional OAuth providers (LinkedIn, etc.)
- Customize the styling using Tailwind classes
