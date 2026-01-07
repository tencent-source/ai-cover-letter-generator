# 🎯 QUICK SETUP - Start Here!

## Step 1: Get FREE Groq API Key

1. Go to: https://console.groq.com/keys
2. Sign up (FREE - no credit card needed)
3. Click "Create API Key"
4. Copy key (looks like: `gsk_abc123xyz...`)

## Step 2: Get PayPal Client ID

1. Go to: https://developer.paypal.com/dashboard/
2. Log in or sign up (FREE)
3. Go to **Apps & Credentials** → **Create App**
4. Select **Seller** account type
5. Copy **Client ID** from Sandbox section (starts with `Aa...`)
6. **For production**: Use Live Client ID instead

**Detailed PayPal setup**: See `PAYPAL_SETUP.md`

## Step 3: Add Keys to `.env`

Create `.env` file in project root:

```bash
# Groq API for AI generation
VITE_GROQ_API_KEY=gsk_paste_your_key_here

# PayPal for payments (Sandbox for testing, Live for production)
VITE_PAYPAL_CLIENT_ID=AaBcDeFgHiJkLmNoPqRsTuVwXyZ
```

## Step 4: Run App

```bash
npm install
npm run dev
```

Open: http://localhost:5173

## Step 5: Deploy

```bash
npm run build
```

Upload `dist/` folder to Vercel, Netlify, or any hosting.

---

## ✅ What's Already Done

✅ PayPal payments integrated ($9.99)
✅ Dark theme (Gen Z friendly)
✅ SEO optimized
✅ No AI model disclosure
✅ Fast & reliable (Groq API)
✅ Mobile responsive
✅ PDF download capability
✅ Tone selector (Professional/Creative/Bold)
✅ Generation history
✅ Rate limiting (5 letters/hour)
✅ Email preview template

---

## 🚨 Before Going Live

1. Add your Groq API key
2. Add PayPal Live Client ID (not Sandbox)
3. Update domain in `index.html`
4. Test PayPal payment flow
5. Monitor PayPal dashboard for transactions
6. Deploy!

---

**Need help?**
- PayPal Setup: See `PAYPAL_SETUP.md`
- General: Check `README.md`
