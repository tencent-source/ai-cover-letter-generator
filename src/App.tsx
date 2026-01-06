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

  // Secret test mode - press 'T' key to bypass paywall
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'T' || e.key === 't') {
        markAsPaid();
        setShowForm(true);
        console.log('🔓 Test mode activated!');
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [markAsPaid]);

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
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto px-4">
        {/* Hero section - Grammarly inspired */}
        {!isPaid && !showForm && !coverLetter && (
          <div className="relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 opacity-60"></div>
            
            <div className="relative max-w-5xl mx-auto py-20 md:py-32 text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Land your dream job with a{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 text-transparent bg-clip-text">
                  perfect cover letter
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Create a personalized, professional cover letter in seconds. 
                No templates, no hassle—just results.
              </p>

              <Button 
                size="lg" 
                onClick={() => setShowPaymentModal(true)}
                className="text-lg px-12 py-6 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 text-white"
              >
                Get Started for $9.99
              </Button>
              
              <p className="text-slate-500 mt-6 text-sm">
                ✓ One-time payment • ✓ Instant access • ✓ No subscription
              </p>
            </div>
          </div>
        )}

        {/* Show form if user has paid and no cover letter yet */}
        {isPaid && showForm && !coverLetter && (
          <div className="max-w-4xl mx-auto py-8">
            <CoverLetterForm
              onGenerate={handleGenerate}
              onError={handleError}
            />
          </div>
        )}

        {/* Show cover letter if generated */}
        {coverLetter && (
          <div className="max-w-4xl mx-auto py-8">
            <CoverLetterDisplay
              coverLetter={coverLetter}
              onRegenerate={handleRegenerate}
            />
          </div>
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

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
      />

      <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-sm text-slate-600">
          <p>Professional cover letters that land interviews • Fast & reliable</p>
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
