# AI Cover Letter Generator

A modern, professional AI-powered cover letter generator web app. Generate personalized cover letters tailored to any job application using Groq's fast AI models.

## Features

- 🤖 **AI-Powered**: Generate professional cover letters using Groq's Llama 4 model
- 💳 **Simple Payments**: One-time payment of $4.99 via Lemon Squeezy
- 📝 **Personalized**: Tailored to your skills, experience, and the job description
- 🔒 **Secure**: Safe payment processing through Lemon Squeezy
- ⚡ **Fast**: AI-generated cover letters in seconds
- 📱 **Responsive**: Works on desktop and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Groq API** for AI generation
- **Lemon Squeezy** for payment processing
- **GitHub Pages** for hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Groq API key (get one at https://console.groq.com)
- A Lemon Squeezy account (https://lemonsqueezy.com)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-cover-letter-generator

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file with:

```env
VITE_GROQ_API_KEY=your-groq-api-key-here
VITE_PAYMENT_URL=your-lemon-squeezy-checkout-url
```

### Development

```bash
npm run dev
```

Open http://localhost:5173 to view the app.

### Build

```bash
npm run build
```

The built files will be in the `dist` folder.

## Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Repository Settings → Pages
3. Select "GitHub Actions" as the source
4. The app will auto-deploy on push to main

## Configuration

### Groq API

Get your API key from: https://console.groq.com/keys

### Lemon Squeezy Payment

1. Create an account at https://lemonsqueezy.com
2. Create a product for "$4.99 Cover Letter Generation"
3. Copy the checkout URL to your `.env` file

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── CoverLetterForm.tsx
│   ├── CoverLetterDisplay.tsx
│   ├── PaymentModal.tsx
│   └── Header.tsx
├── contexts/
│   └── AppContext.tsx
├── services/
│   └── groq.ts       # Groq API integration
├── utils/
│   ├── constants.ts  # App configuration
│   └── helpers.ts    # Utility functions
├── App.tsx
├── main.tsx
└── index.css
```

## Security Notes

- The Groq API key is currently stored in environment variables
- For production use, consider using a serverless proxy (e.g., Cloudflare Workers)
- Payment verification is currently client-side; enhance with webhook verification for higher security

## License

MIT License - feel free to use this for your own projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
