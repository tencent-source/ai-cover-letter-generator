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
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-primary-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            One-Time Payment Required
          </h3>
          
          <p className="text-gray-600 mb-6">
            Generate a personalized, professional cover letter powered by AI for just{' '}
            <span className="font-semibold text-primary-600">
              {formatCurrency(PAYMENT_CONFIG.price)}
            </span>
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
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
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-yellow-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Verify Your Payment
          </h3>
          
          <p className="text-gray-600 mb-4">
            After completing your payment, enter the transaction ID from your email receipt to unlock your cover letter.
          </p>
          
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter transaction ID"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Verified!
          </h3>
          
          <p className="text-gray-600 mb-6">
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
