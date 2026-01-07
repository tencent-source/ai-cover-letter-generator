# Project Documentation

## Overview

This is an AI-powered cover letter generator built with React, TypeScript, and Vite. The application uses Groq API for AI generation and PayPal for payment processing.

## Tech Stack

- **Frontend**: React 19.2 + TypeScript 5.9 + Vite 7.2
- **Styling**: Tailwind CSS 4.1 (dark theme, Gen Z friendly)
- **AI Backend**: Groq API (fast Llama 3.3-70B-versatile model)
- **Payments**: PayPal JavaScript SDK (@paypal/react-paypal-js v8.1.3)
- **PDF Export**: jsPDF 4.0

## Features

✅ AI-powered cover letter generation
✅ PayPal payment integration (Sandbox & Live)
✅ PDF download capability
✅ Tone selector (Professional/Creative/Bold)
✅ Word counter
✅ Generation history (localStorage)
✅ Email preview template
✅ Rate limiting (5 letters/hour)
✅ Mobile responsive
✅ SEO optimized
✅ No AI model disclosure

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── Header.tsx         # App header
│   ├── CoverLetterForm.tsx # Form for input
│   ├── CoverLetterDisplay.tsx # Display result
│   └── PaymentModal.tsx  # PayPal integration
├── contexts/
│   └── AppContext.tsx    # Payment state management
├── services/
│   └── ai.ts            # Groq API integration
└── utils/
    ├── constants.ts       # App configuration
    ├── helpers.ts        # Utility functions
    ├── history.ts        # LocalStorage history
    └── rateLimit.ts     # Rate limiting
```

## Payment Flow

1. User clicks "Get Started for $9.99"
2. PayPal payment modal opens with PayPal Buttons
3. User clicks PayPal button → PayPal popup opens
4. User completes payment
5. PayPal confirms payment → `onApprove` callback fires
6. Order captured automatically
7. Payment status saved to localStorage
8. User granted access to cover letter generation

## Rate Limiting

- 5 cover letters per hour
- Resets every hour
- Enforced client-side (localStorage)
- Prevents API abuse

## Environment Variables

Required:
```bash
VITE_GROQ_API_KEY=gsk_your_key_here          # Groq API for AI
VITE_PAYPAL_CLIENT_ID=AaBcDeFg...            # PayPal Client ID
```

## Development

```bash
npm install
npm run dev     # Start dev server (http://localhost:5173)
npm run build   # Production build
npm run preview  # Preview production build
```

## Deployment

1. Build project: `npm run build`
2. Upload `dist/` folder to hosting
3. Set environment variables on hosting platform
4. Test PayPal payment flow

## Security Notes

- API keys stored in environment variables
- Never commit `.env` file
- Client-side rate limiting prevents abuse
- PayPal SDK handles secure payment processing

## License

See LICENSE file for details.
