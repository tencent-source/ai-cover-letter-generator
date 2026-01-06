// App Configuration
export const APP_CONFIG = {
  name: 'AI Cover Letter Generator',
  description: 'Generate personalized, professional cover letters with AI',
  version: '1.0.0',
};

// GROQ API Configuration
// Get your API key from: https://console.groq.com/keys
// IMPORTANT: Never commit your API key to version control!
// Use environment variables or a proxy service for security
export const GROQ_CONFIG = {
  apiEndpoint: 'https://api.groq.com/openai/v1/chat/completions',
  // API key should be set via VITE_GROQ_API_KEY environment variable
  // For local development, create a .env file with VITE_GROQ_API_KEY=your-key
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  model: 'llama-4-scout-17b-16e-instruct',
  maxTokens: 1000,
  temperature: 0.7,
};

// Lemon Squeezy Payment Configuration
// Create your store and product at: https://app.lemonsqueezy.com
export const PAYMENT_CONFIG = {
  checkoutUrl: import.meta.env.VITE_PAYMENT_URL || 'https://whatstore.lemonsqueezy.com/checkout/buy/1a846f2d-534f-4ebf-ab2c-94e77b0ddaff',
  price: 4.99,
  currency: 'USD',
};

// Verification Settings
export const VERIFICATION_CONFIG = {
  validityDuration: 24 * 60 * 60 * 1000,
};

// LocalStorage keys
export const STORAGE_KEYS = {
  paymentStatus: 'cover_letter_app_paid',
  transactions: 'cover_letter_app_transactions',
  userData: 'cover_letter_app_user_data',
};
