# Jai Bhatia - Personal Website

A production-grade personal website built with Next.js 14, TypeScript, and Tailwind CSS. Designed to showcase professional experience, projects, and writing while maintaining excellent performance and accessibility.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd jai-bhatia-personal-site
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   CONTACT_TO_EMAIL=your-email@example.com
   RESEND_API_KEY=your_resend_api_key
   GITHUB_USERNAME=JaiBhatia19
   LINKEDIN_PROFILE_URL=https://www.linkedin.com/in/jaibhatia19/
   SITE_URL=https://jaibhatia.dev
   ```

3. **Build content from resume and social profiles:**
   ```bash
   pnpm run build-content
   ```

4. **Start development server:**
   ```bash
   pnpm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/
├── app/                    # Next.js 14 App Router
│   ├── api/contact/        # Contact form API route
│   ├── experience/         # Experience page
│   ├── projects/           # Projects page
│   ├── writing/            # Blog posts
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── hero.tsx            # Hero section
│   ├── navbar.tsx          # Navigation
│   ├── footer.tsx          # Footer
│   ├── card.tsx            # Card components
│   ├── section.tsx         # Section wrapper
│   ├── timeline.tsx        # Experience timeline
│   ├── repo-card.tsx       # GitHub repo cards
│   └── contact-form.tsx    # Contact form
├── lib/                    # Utility functions
│   ├── content.ts          # Content management
│   ├── utils.ts            # Common utilities
│   └── og.ts               # OG image generation
├── data/                   # Generated content
│   ├── profile.json        # Parsed resume data
│   └── projects.json       # GitHub projects
├── content/posts/          # MDX blog posts
├── public/                 # Static assets
├── scripts/                # Build scripts
│   └── build-content.ts    # Content ingestion
└── tests/                  # Test files
```

## 🛠️ Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint
- `pnpm run test` - Run tests
- `pnpm run build-content` - Parse resume and scrape social profiles
- `pnpm run format` - Format code with Prettier

## 📝 Content Management

### Adding New Blog Posts

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Post description for SEO"
   date: "2024-01-15"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write your content in Markdown
4. The post will automatically appear on the writing page

### Updating Profile Information

1. Edit `data/profile.json` directly, or
2. Update your resume PDF and run `pnpm run build-content`

### Managing Projects

1. Edit `data/projects.json` directly, or
2. Run `pnpm run build-content` to sync with GitHub

## 🎨 Customization

### Changing the Accent Color

The site uses a dynamic accent color generated from your GitHub avatar. To customize:

1. Edit `lib/og.ts` and `styles/globals.css`
2. Update the `--primary` CSS variable
3. Or modify the color generation logic in `lib/utils.ts`

### Adding New Pages

1. Create a new directory in `app/`
2. Add `page.tsx` with your content
3. Update navigation in `components/navbar.tsx`

### Modifying the Design

- **Colors**: Edit `styles/globals.css` CSS variables
- **Typography**: Update font imports and Tailwind config
- **Components**: Modify components in `components/`
- **Layout**: Update `app/layout.tsx`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy with Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard
   - Deploy!

3. **Set Environment Variables in Vercel:**
   - `CONTACT_TO_EMAIL`
   - `RESEND_API_KEY`
   - `GITHUB_USERNAME`
   - `LINKEDIN_PROFILE_URL`
   - `SITE_URL`

4. **Configure Build Settings:**
   - Build Command: `pnpm run build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

### Deploy to Other Platforms

The site is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Render
- Any platform supporting Node.js

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CONTACT_TO_EMAIL` | Email address for contact form | Yes |
| `RESEND_API_KEY` | Resend API key for email sending | Yes |
| `GITHUB_USERNAME` | GitHub username for project scraping | Yes |
| `LINKEDIN_PROFILE_URL` | LinkedIn profile URL | Yes |
| `SITE_URL` | Your website URL | Yes |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |

### Content Sources

The site automatically pulls content from:
- **Resume PDF**: Parsed into structured JSON
- **LinkedIn**: Public profile information
- **GitHub**: Repository data and statistics

## 📊 Performance

The site is optimized for:
- **Lighthouse Performance**: 95+
- **Accessibility**: 98+
- **Best Practices**: 100
- **SEO**: 100

### Performance Features

- Image optimization with `next/image`
- Font preloading to prevent layout shift
- Static generation for blog posts
- Minimal JavaScript bundle
- Optimized CSS with Tailwind

## 🧪 Testing

Run the test suite:
```bash
pnpm run test
```

Tests cover:
- Utility functions
- Content parsing
- Component rendering
- API endpoints

## 📱 Responsive Design

The site is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1400px+)

## ♿ Accessibility

Built with accessibility in mind:
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- High contrast ratios
- Screen reader compatibility
- Focus management

## 🔒 Security

Security features include:
- Input validation with Zod
- Rate limiting on API routes
- Spam protection (honeypot)
- CSRF protection
- Secure headers
- Environment variable validation

## 📈 Analytics

Optional Google Analytics integration:
1. Add your GA ID to environment variables
2. Analytics will be automatically included
3. Privacy-friendly implementation

## 🐛 Troubleshooting

### Common Issues

**Build fails with "Profile data not found":**
```bash
pnpm run build-content
```

**Contact form not working:**
- Check `RESEND_API_KEY` is set correctly
- Verify email address in `CONTACT_TO_EMAIL`

**Styling issues:**
- Clear browser cache
- Check Tailwind CSS is building correctly

**Content not updating:**
- Run `pnpm run build-content`
- Check file permissions
- Verify JSON syntax

### Getting Help

1. Check the [Issues](https://github.com/your-username/jai-bhatia-personal-site/issues) page
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check [Tailwind CSS docs](https://tailwindcss.com/docs)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support:
- Email: jaibhatia1906@gmail.com
- LinkedIn: [linkedin.com/in/jaibhatia19](https://linkedin.com/in/jaibhatia19)
- GitHub: [github.com/JaiBhatia19](https://github.com/JaiBhatia19)

---

## 🚀 10-Minute Go-Live Checklist

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your values
   ```

3. **Build content:**
   ```bash
   pnpm run build-content
   ```

4. **Test locally:**
   ```bash
   pnpm run dev
   # Visit http://localhost:3000
   ```

5. **Build for production:**
   ```bash
   pnpm run build
   ```

6. **Deploy to Vercel:**
   - Push to GitHub
   - Connect to Vercel
   - Set environment variables
   - Deploy!

7. **Verify deployment:**
   - Check all pages load correctly
   - Test contact form
   - Verify sitemap.xml and robots.txt
   - Check OG images

8. **Optional: Enable analytics**
   - Add Google Analytics ID to environment variables
   - Redeploy

**You're live! 🎉**

---

*Built with ❤️ by Jai Bhatia*
