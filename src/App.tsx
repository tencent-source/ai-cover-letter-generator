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

  const handleGenerate = (letter: string, jobTitle?: string, companyName?: string) => {
    setCoverLetter(letter);
    setError('');
    setShowForm(false);
    
    // Save to history
    if (jobTitle && companyName) {
      const { saveToHistory } = require('@/utils/history');
      saveToHistory({ coverLetter: letter, jobTitle, companyName });
    }
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

              {/* Example Output Section */}
              <div className="mt-16 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">
                  See the quality for yourself
                </h3>
                <p className="text-slate-600 text-center mb-8">
                  Here's an example of what our AI generates
                </p>
                
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
                  <div className="text-sm text-slate-600 mb-4 font-medium">
                    Example: Software Engineer at Google
                  </div>
                  <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed whitespace-pre-line">
{`Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at Google. With five years of experience building scalable web applications and a proven track record of delivering high-impact features, I am excited about the opportunity to contribute to Google's mission of organizing the world's information.

Throughout my career, I have specialized in full-stack development using React, Node.js, and cloud technologies. At my current role, I led the development of a real-time analytics platform that processes over 1 million events per day, improving data processing efficiency by 40%. This experience has given me deep expertise in system design, performance optimization, and building products that scale.

What particularly excites me about Google is your commitment to innovation and technical excellence. I'm passionate about solving complex problems and creating elegant solutions that impact millions of users. Your work in AI, cloud computing, and developer tools aligns perfectly with my interests and expertise.

I would welcome the opportunity to discuss how my skills in software engineering and passion for technology can contribute to Google's continued success. Thank you for considering my application.

Sincerely,
John Doe`}
                  </div>
                </div>

                <p className="text-center mt-6 text-slate-600">
                  <span className="font-semibold">This took 3 seconds to generate.</span> Imagine what it can do for your job application.
                </p>
              </div>
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
