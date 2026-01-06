import React, { useState } from 'react';
import { AlertCircle, Lock } from 'lucide-react';
import { Header } from './components/Header';
import { CoverLetterForm } from './components/CoverLetterForm';
import { CoverLetterDisplay } from './components/CoverLetterDisplay';
import { PaymentModal } from './components/PaymentModal';
import { Button } from './components/ui/Button';
import { AppProvider, useApp } from './contexts/AppContext';
import { AI_CONFIG } from './utils/constants';

function AppContent() {
  const { isPaid, isLoading, markAsPaid, verifyPayment } = useApp();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handlePaymentComplete = () => {
    markAsPaid();
    setShowPaymentModal(false);
    setShowForm(true);
  };

  const handleGenerate = (letter: string) => {
    setCoverLetter(letter);
    setError('');
    setShowForm(false);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleRegenerate = () => {
    setShowForm(true);
    setCoverLetter('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-slate-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Show payment modal if user hasn't paid */}
        {!isPaid && !showForm && !coverLetter && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-slate-400" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Generate Professional Cover Letters
            </h2>

            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Create personalized, compelling cover letters tailored to any job application.
              One-time payment of {AI_CONFIG.apiKey ? 'just $4.99' : 'required'}.
            </p>

            <Button size="lg" onClick={() => setShowPaymentModal(true)}>
              Get Started - $4.99
            </Button>
          </div>
        )}

        {/* Show form if user has paid and no cover letter yet */}
        {isPaid && showForm && !coverLetter && (
          <CoverLetterForm
            onGenerate={handleGenerate}
            onError={handleError}
          />
        )}

        {/* Show cover letter if generated */}
        {coverLetter && (
          <CoverLetterDisplay
            coverLetter={coverLetter}
            onRegenerate={handleRegenerate}
          />
        )}

        {/* Error message */}
        {error && (
          <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <p className="text-red-200 font-medium">Error generating cover letter</p>
              <p className="text-red-400 text-sm mt-1">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError('')}
                className="mt-2 text-red-400 hover:text-red-300"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-slate-400">
          <p>Powered by Advanced AI • Fast, intelligent cover letter generation</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
