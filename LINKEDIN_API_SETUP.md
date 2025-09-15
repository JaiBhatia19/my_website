# LinkedIn API Setup for Live Activity

This guide will help you set up LinkedIn API integration to show your 3 most recent LinkedIn activities on your website.

## 🔑 LinkedIn API Setup Steps

### Step 1: Create LinkedIn App
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Sign in with your LinkedIn account
3. Click "Create app"
4. Fill in the required information:
   - **App name**: Your Website Live Activity
   - **LinkedIn Page**: Select your personal LinkedIn page
   - **Privacy policy URL**: Your website's privacy policy
   - **App logo**: Upload a logo (optional)

### Step 2: Request API Access
1. In your app dashboard, go to "Products" tab
2. Request access to:
   - **Sign In with LinkedIn using OpenID Connect** (for authentication)
   - **Share on LinkedIn** (for posting content)
   - **Marketing Developer Platform** (if available)

### Step 3: Get API Credentials
1. Go to "Auth" tab in your app dashboard
2. Note down:
   - **Client ID**
   - **Client Secret**
3. Add redirect URLs:
   - `http://localhost:3000/api/linkedin/callback` (for development)
   - `https://your-domain.com/api/linkedin/callback` (for production)

### Step 4: Generate Access Token
1. Use LinkedIn's OAuth 2.0 flow to get an access token
2. You can use tools like Postman or create a simple script
3. The access token will be used to fetch your LinkedIn data

### Step 5: Update Environment Variables
Add these to your `.env.local` file:

```env
# LinkedIn API Credentials
LINKEDIN_CLIENT_ID=your-client-id-here
LINKEDIN_CLIENT_SECRET=your-client-secret-here
LINKEDIN_ACCESS_TOKEN=your-access-token-here
```

## 🚀 Alternative: LinkedIn Scraping with Session Cookies

If LinkedIn API access is limited, you can use session cookies:

### Step 1: Get Session Cookies
1. Log into LinkedIn in your browser
2. Open Developer Tools (F12)
3. Go to Application/Storage tab
4. Copy the following cookies:
   - `li_at` (main authentication cookie)
   - `JSESSIONID`
   - `bcookie`

### Step 2: Update Environment Variables
Add to your `.env.local`:

```env
# LinkedIn Session Cookies
LINKEDIN_SESSION_COOKIE=your-li-at-cookie-here
LINKEDIN_JSESSIONID=your-jsessionid-here
LINKEDIN_BCOOKIE=your-bcookie-here
```

## 📊 What Gets Displayed

The system will show your 3 most recent LinkedIn activities, filtering out:
- ✅ Original posts
- ✅ Articles you've written
- ✅ Comments you've made
- ✅ Reposts with your own comments
- ❌ Reposts without comments (as requested)

## 🔄 Daily Refresh

The system automatically refreshes your LinkedIn data once every 24 hours to keep the content fresh.

## 🛠️ Troubleshooting

### Common Issues:
1. **API Access Denied**: LinkedIn may limit API access for personal accounts
2. **Token Expired**: Access tokens expire and need to be refreshed
3. **Rate Limiting**: LinkedIn has rate limits on API calls

### Fallback System:
If LinkedIn API fails, the system falls back to curated content in `data/linkedin-posts.json`.

## 📝 Manual Content Management

You can always manually update your LinkedIn posts by editing `data/linkedin-posts.json`:

```json
{
  "posts": [
    {
      "id": 1,
      "content": "Your latest LinkedIn post here",
      "type": "post",
      "date": "2025-01-15",
      "hasComment": true
    }
  ]
}
```

## 🎯 Next Steps

1. Set up LinkedIn API credentials
2. Test the integration
3. Monitor the daily refresh
4. Update content as needed

For questions or issues, check the console logs or contact support.
