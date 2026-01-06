// App Configuration
export const APP_CONFIG = {
  name: 'AI Cover Letter Generator',
  description: 'Generate personalized, professional cover letters with AI',
  version: '1.0.0',
};

// AI API Configuration (OpenRouter with Xiaomi Mimo V2 Flash Free Model)
// IMPORTANT: Never commit your API key to version control!
// Use environment variables or a proxy service for security
export const AI_CONFIG = {
  apiEndpoint: 'https://openrouter.ai/api/v1/chat/completions',
  // API key should be set via VITE_OPENROUTER_API_KEY environment variable
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || '',
  model: 'xiaomi/mimo-v2-flash:free',
  maxTokens: 1000,
  temperature: 0.7,
};

// Lemon Squeezy Payment Configuration
export const PAYMENT_CONFIG = {
  checkoutUrl: 'https://whatstore.lemonsqueezy.com/checkout/buy/1a846f2d-534f-4ebf-ab2c-94e77b0ddaff',
  price: 9.99,
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
