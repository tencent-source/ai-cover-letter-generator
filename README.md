# 🚀 Professional Cover Letter Generator

A modern, sleek web app that generates professional cover letters. Built with React, TypeScript, and Tailwind CSS. Dark theme optimized for Gen Z professionals.

## ✨ Features

- ⚡ **Fast Generation** - Create professional cover letters in seconds
- 🎨 **Modern Dark Theme** - Sleek design that appeals to Gen Z
- 💳 **Simple Payment** - One-time payment of $9.99 via Lemon Squeezy
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔒 **Secure** - No data stored, privacy-first approach
- 🎯 **Personalized** - Tailored to your experience and job description
- 🔍 **SEO Optimized** - Built for discoverability

## 💰 Pricing Strategy

**$9.99** - Sweet spot pricing
- Premium quality perception
- Affordable for job seekers
- Psychological pricing (under $10)
- Higher perceived value than $4.99

## 🛠️ Tech Stack

- **React 19** + TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **Groq API** (Free tier - fast & reliable)
- **Lemon Squeezy** for payments
- **GitHub Pages** ready for deployment

## 🚀 Quick Start

### 1. Get Your Groq API Key (FREE)

1. Go to https://console.groq.com/keys
2. Sign up (it's free!)
3. Create a new API key
4. Copy the key (starts with `gsk_`)

### 2. Setup

```bash
cd ~/Documents/ai-cover-letter-generator

# Install dependencies (if not already done)
npm install

# Add your Groq API key to .env
# Open .env and replace gsk_your_api_key_here with your actual key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
ai-cover-letter-generator/
├── public/
│   ├── robots.txt       # SEO: Search engine instructions
│   └── sitemap.xml      # SEO: Site structure for Google
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── CoverLetterForm.tsx
│   │   ├── CoverLetterDisplay.tsx
│   │   └── PaymentModal.tsx
│   ├── contexts/
│   │   └── AppContext.tsx
│   ├── services/
│   │   └── ai.ts        # Groq API integration
│   ├── utils/
│   │   ├── constants.ts # App configuration
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── .env                 # Your API keys (DO NOT COMMIT)
└── index.html          # SEO optimized HTML
```

## 🔑 Environment Variables

```bash
# .env file
VITE_GROQ_API_KEY=gsk_your_actual_api_key_here
```

## 💳 Payment Integration

Already configured with your Lemon Squeezy checkout:
- URL: `https://whatstore.lemonsqueezy.com/checkout/buy/1a846f2d-534f-4ebf-ab2c-94e77b0ddaff`
- Price: $9.99 USD

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 3: GitHub Pages
```bash
npm run build
# Upload dist/ folder to GitHub Pages
```

## 🎯 SEO Features

✅ Meta tags optimized for Google
✅ Open Graph tags for social sharing
✅ Twitter Card support
✅ robots.txt for search engines
✅ sitemap.xml for indexing
✅ Semantic HTML structure
✅ Fast load times (Vite + lazy loading)

## 🎨 Design Features

- **Dark Theme** - Modern, eye-friendly
- **Gen Z Appeal** - Clean, minimal, fast
- **Smooth Animations** - Professional feel
- **Mobile First** - Responsive on all devices
- **Fast Loading** - Optimized assets

## 🔐 Security Notes

- API key stored in environment variables
- No user data stored on server
- Client-side payment verification
- For production: Consider adding server-side payment webhook verification

## 📊 Why Groq?

- ✅ **FREE tier** (100,000 tokens/day)
- ✅ **Fast** (faster than OpenAI)
- ✅ **Reliable** (99.9% uptime)
- ✅ **Quality** (Llama 3 models)
- ✅ **No credit card** required for free tier

## 🚨 Important Notes

1. **Add your Groq API key** in `.env` before running
2. **Update canonical URL** in `index.html` with your actual domain
3. **Update sitemap.xml** with your actual domain
4. **Don't commit** your `.env` file to Git

## 📝 To-Do Before Launch

- [ ] Add your Groq API key to `.env`
- [ ] Replace `https://yourapp.com/` with your actual domain in:
  - `index.html` (canonical URL)
  - `public/robots.txt`
  - `public/sitemap.xml`
- [ ] Test payment flow end-to-end
- [ ] Set up Lemon Squeezy webhook (optional, for better security)
- [ ] Create an og-image.png for social sharing

## 🎬 How It Works

1. User lands on site (dark, modern design)
2. User clicks "Get Started" 
3. Payment modal shows ($9.99)
4. User pays via Lemon Squeezy
5. User fills in job details + their info
6. AI generates personalized cover letter
7. User can copy/download the letter

## 💡 Tips for Success

- **Price stays at $9.99** - Don't go lower, it devalues the product
- **Market to job seekers** - LinkedIn, Reddit r/jobs, Twitter
- **Show social proof** - Add testimonials once you get users
- **Fast loading is key** - Gen Z has no patience
- **Mobile-first** - Most users will be on phones

## 🆘 Troubleshooting

**Issue:** Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue:** API errors
- Check your Groq API key is correct in `.env`
- Ensure you haven't hit rate limits (100k tokens/day free)
- Check Groq status: https://status.groq.com

**Issue:** Payment not working
- Verify Lemon Squeezy checkout URL is correct
- Test in different browser
- Check browser console for errors

## 📈 Marketing Ideas

- Post on r/jobsearching, r/resumes
- Tweet about it with #JobSearch #CareerTips
- LinkedIn posts targeting job seekers
- TikTok videos showing the speed
- Instagram Reels demonstrating the tool

## 📄 License

MIT License - Use it however you want!

## 🙋‍♂️ Support

Need help? Check:
- Groq Docs: https://console.groq.com/docs
- Lemon Squeezy Docs: https://docs.lemonsqueezy.com
- Vite Docs: https://vitejs.dev

---

**Built for Gen Z professionals who value speed, quality, and aesthetics.** 🚀
