// App Configuration
export const APP_CONFIG = {
  name: 'AI Cover Letter Generator',
  description: 'Generate personalized, professional cover letters with AI',
  version: '1.0.0',
};

// AI API Configuration (Groq API)
// IMPORTANT: Never commit your API key to version control!
// Use environment variables or a proxy service for security
export const AI_CONFIG = {
  apiEndpoint: 'https://api.groq.com/openai/v1/chat/completions',
  // API key should be set via VITE_GROQ_API_KEY environment variable
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '',
  model: 'llama-3.3-70b-versatile',
  maxTokens: 1000,
  temperature: 0.7,
};

// PayPal Payment Configuration
export const PAYMENT_CONFIG = {
  currency: 'USD',
  price: 9.99,
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
