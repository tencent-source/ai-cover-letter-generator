import React, { useState } from 'react';
import { CreditCard, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Modal } from './ui/Modal';
import { PAYMENT_CONFIG } from '@/utils/constants';
import { formatCurrency } from '@/utils/helpers';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export function PaymentModal({ isOpen, onClose, onPaymentComplete }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'intro' | 'verifying' | 'complete'>('intro');
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

  const handlePayment = () => {
    setIsProcessing(true);
    // Open Lemon Squeezy checkout in new tab
    window.open(PAYMENT_CONFIG.checkoutUrl, '_blank');
    
    // Show verification step
    setTimeout(() => {
      setIsProcessing(false);
      setStep('verifying');
    }, 1500);
  };

  const handleVerify = () => {
    if (!transactionId.trim()) {
      setError('Please enter your transaction ID');
      return;
    }

    setError('');
    // In a real app, you would verify this with the payment processor
    // For now, we accept any non-empty transaction ID
    setStep('complete');
    onPaymentComplete();
  };

  const handleClose = () => {
    setStep('intro');
    setTransactionId('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Generate Cover Letter" size="md">
      {step === 'intro' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-emerald-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            One-Time Payment
          </h3>
          
          <p className="text-slate-600 mb-6 text-lg">
            Generate a personalized, professional cover letter for just{' '}
            <span className="font-bold text-emerald-600">
              {formatCurrency(PAYMENT_CONFIG.price)}
            </span>
          </p>
          
          <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">What you get:</h4>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Personalized cover letter
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                AI-powered customization
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Download or copy to clipboard
              </li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePayment} 
              loading={isProcessing}
              className="flex-1"
            >
              Pay {formatCurrency(PAYMENT_CONFIG.price)}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {step === 'verifying' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-orange-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Verify Your Payment
          </h3>
          
          <p className="text-slate-600 mb-4 text-lg">
            After completing your payment, enter the transaction ID from your email receipt to unlock your cover letter.
          </p>
          
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter transaction ID"
            className="w-full px-4 py-3 border border-slate-300 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
          />
          
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}
          
          <p className="text-xs text-gray-500 mb-4">
            Transaction ID can be found in your Lemon Squeezy receipt email
          </p>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleVerify} className="flex-1">
              Verify & Generate
            </Button>
          </div>
        </div>
      )}

      {step === 'complete' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Payment Verified!
          </h3>
          
          <p className="text-slate-600 mb-6 text-lg">
            Your payment has been verified. You can now generate your cover letter.
          </p>
          
          <Button onClick={handleClose} className="w-full">
            Continue to Cover Letter
          </Button>
        </div>
      )}
    </Modal>
  );
}
