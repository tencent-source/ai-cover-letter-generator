# 🎯 PayPal Setup Guide

## Step 1: Get PayPal Client ID

1. Go to: https://developer.paypal.com/dashboard/
2. Log in or sign up (FREE)
3. Go to **Apps & Credentials** → **Create App**
4. Select **Seller** account type
5. Fill in app details:
   - App name: "AI Cover Letter Generator"
   - App type: "Merchant"
6. Scroll down to **Sandbox** section
7. Copy your **Client ID** (starts with `Aa...`)

**For production:**
- Scroll down to **Live** section
- Copy your **Live Client ID**
- Add it to `.env` when deploying

## Step 2: Add Client ID to Environment

Open `.env` file in your project root:

```bash
VITE_PAYPAL_CLIENT_ID=AaBcDeFgHiJkLmNoPqRsTuVwXyZ12345
```

## Step 3: Get Groq API Key (if not already)

1. Go to: https://console.groq.com/keys
2. Sign up (FREE - no credit card needed)
3. Click "Create API Key"
4. Copy key (looks like: `gsk_abc123xyz...`)
5. Add to `.env`:

```bash
VITE_GROQ_API_KEY=gsk_paste_your_key_here
```

## Step 4: Run the App

```bash
npm run dev
```

Open: http://localhost:5173

## Step 5: Test PayPal Flow

1. Click "Get Started for $9.99"
2. PayPal payment window will open
3. Complete payment (use PayPal sandbox buyer account for testing)
4. After payment, you'll see "Payment Successful!"
5. Click "Continue to Cover Letter"
6. Fill form and generate your cover letter

## PayPal Sandbox Testing

### Get Sandbox Buyer Account

1. Go to: https://developer.paypal.com/dashboard/accounts
2. Under **Sandbox Accounts**, you'll see a buyer account
3. Click to view credentials
4. Use these credentials to test payments

### Common Sandbox Emails/Passwords

PayPal provides these automatically:
- Buyer email: `sb-xxxxxxx@personal.example.com`
- Buyer password: (provided in dashboard)

## Deploying to Production

### Update `.env` for Production

```bash
VITE_GROQ_API_KEY=gsk_your_live_groq_key
VITE_PAYPAL_CLIENT_ID=AaBcDeFgHiJkLmNoPqRsTuVwXyZ  # Live Client ID
```

### Deploy Steps

```bash
npm run build
```

Upload `dist/` folder to:
- Vercel: Drag & drop
- Netlify: Drag & drop
- AWS S3 + CloudFront: Configure static hosting
- Any static hosting provider

### Important for Production

1. ✅ Replace sandbox Client ID with live Client ID
2. ✅ Add domain to PayPal app's allowed domains
3. ✅ Test live payment flow
4. ✅ Monitor PayPal dashboard for transactions

---

## 💡 Troubleshooting

**"Invalid Client ID"**
- Check `.env` file has correct Client ID
- Ensure Client ID starts with `Aa...`
- Restart dev server after changing `.env`

**"Payment window doesn't open"**
- Check browser pop-up blocker
- Allow pop-ups for localhost (development)
- PayPal uses popup for payment confirmation

**"Payment successful but no access"**
- Check browser console for errors
- Clear localStorage and try again
- Verify PayPal order was captured in dashboard

**API errors when generating**
- Check Groq API key is valid
- Ensure `VITE_GROQ_API_KEY` is set
- Check Groq quota/billing limits

---

## 🚨 Security Notes

- NEVER commit `.env` file to git
- ALWAYS use environment variables for secrets
- Monitor PayPal dashboard for suspicious activity
- Set up webhook for production order confirmations
