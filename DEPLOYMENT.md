# 🚀 Deployment Guide

## Pre-Deployment Checklist

### ✅ **1. Test All Features Locally**

```bash
# Start development server
pnpm run dev

# Test these features:
# ✅ Home page loads with profile picture
# ✅ All navigation links work
# ✅ Contact form submits successfully
# ✅ Projects page shows GitHub data
# ✅ Experience page displays timeline
# ✅ About page shows bio and photo
# ✅ Writing page lists blog posts
# ✅ Mobile responsiveness
# ✅ Dark/light theme toggle
```

### ✅ **2. Set Up Environment Variables**

Create `.env.local` file:

```bash
cp env.example .env.local
```

Edit `.env.local` with your values:

```env
# Required for contact form
CONTACT_TO_EMAIL=jaibhatia1906@gmail.com
RESEND_API_KEY=your-resend-api-key

# Optional for live GitHub data
GITHUB_TOKEN=your-github-token

# Site configuration
SITE_URL=https://your-domain.com
GITHUB_USERNAME=JaiBhatia19
LINKEDIN_PROFILE_URL=https://www.linkedin.com/in/jaibhatia19/
```

### ✅ **3. Get Required API Keys**

#### **Resend (Email Service)**
1. Go to [resend.com](https://resend.com)
2. Sign up for free account
3. Create API key
4. Add to `RESEND_API_KEY` in `.env.local`

#### **GitHub Token (Optional)**
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate new token with `public_repo` scope
3. Add to `GITHUB_TOKEN` in `.env.local`

## 🚀 **Deploy to Vercel**

### **Method 1: Deploy Button (Easiest)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/jai-bhatia-personal-site)

### **Method 2: Manual Deployment**

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/jai-bhatia-personal-site.git
git push -u origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables
   - Click "Deploy"

### **Method 3: Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to configure
```

## ⚙️ **Vercel Configuration**

### **Environment Variables in Vercel:**
- `CONTACT_TO_EMAIL`
- `RESEND_API_KEY`
- `GITHUB_TOKEN` (optional)
- `SITE_URL`
- `GITHUB_USERNAME`
- `LINKEDIN_PROFILE_URL`

### **Build Settings:**
- **Framework Preset:** Next.js
- **Build Command:** `pnpm run build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install`

## 🔄 **Live Data Updates**

### **Automatic Updates:**
- GitHub data refreshes every 12 hours (twice daily)
- LinkedIn data refreshes every 12 hours (twice daily)
- Manual refresh via `/api/refresh-data` endpoint

### **Manual Data Refresh:**
```bash
# Trigger data refresh
curl -X POST https://your-domain.com/api/refresh-data
```

## 📊 **Post-Deployment Testing**

### **1. Test All Pages:**
- [ ] Home page loads correctly
- [ ] Profile picture displays
- [ ] All navigation works
- [ ] Contact form submits
- [ ] Projects show live GitHub data
- [ ] Experience timeline displays
- [ ] About page shows bio
- [ ] Writing page lists posts

### **2. Test Contact Form:**
- [ ] Form validation works
- [ ] Success message shows
- [ ] Email is received
- [ ] Error handling works

### **3. Test Mobile:**
- [ ] Responsive design
- [ ] Touch interactions
- [ ] Navigation menu
- [ ] Form usability

### **4. Test Performance:**
- [ ] Lighthouse score > 95
- [ ] Images load quickly
- [ ] No console errors
- [ ] Fast page transitions

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Contact form not working:**
   - Check `RESEND_API_KEY` is set
   - Verify email address in `CONTACT_TO_EMAIL`

2. **GitHub data not loading:**
   - Check `GITHUB_TOKEN` is set
   - Verify token has `public_repo` scope

3. **Build fails:**
   - Check all environment variables are set
   - Run `pnpm run build` locally first

4. **Images not loading:**
   - Ensure images are in `public/images/` folder
   - Check file permissions

## 📈 **Analytics Setup (Optional)**

### **Google Analytics:**
1. Create GA4 property
2. Add tracking ID to `NEXT_PUBLIC_GA_ID`
3. Analytics will be included automatically

### **Vercel Analytics:**
- Automatically enabled on Vercel
- No additional setup required

## 🔐 **Security Checklist**

- [ ] Environment variables are secure
- [ ] No sensitive data in code
- [ ] Contact form has spam protection
- [ ] Rate limiting enabled
- [ ] HTTPS enabled (automatic on Vercel)

## 📱 **Social Media Integration**

### **LinkedIn:**
1. Add website URL to LinkedIn profile
2. Include in "Featured" section
3. Share updates about your site

### **GitHub:**
1. Pin your personal site repository
2. Add to README
3. Include in profile bio

## 🎯 **Success Metrics**

After deployment, monitor:
- Page load times
- Contact form submissions
- GitHub data freshness
- Mobile traffic
- Search engine indexing

## 🆘 **Support**

If you encounter issues:
1. Check Vercel deployment logs
2. Test locally with `pnpm run dev`
3. Verify environment variables
4. Check GitHub/LinkedIn API limits

---

**🎉 Congratulations! Your personal website is now live and will automatically stay updated with your latest GitHub and LinkedIn activity twice daily!**
