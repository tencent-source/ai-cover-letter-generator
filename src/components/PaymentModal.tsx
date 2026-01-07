import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
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
  const [step, setStep] = useState<'intro' | 'processing' | 'complete'>('intro');
  const [error, setError] = useState('');

  const handlePaymentSuccess = () => {
    setStep('complete');
    onPaymentComplete();
  };

  const handleClose = () => {
    setStep('intro');
    setError('');
    onClose();
  };

  const PayPalButtonsWrapper = () => {
    const [{ isPending }] = usePayPalScriptReducer();

    if (isPending) {
      return (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      );
    }

    return (
      <div className="paypal-button-container">
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  description: 'AI Cover Letter Generator - One-Time Payment',
                  amount: {
                    currency_code: PAYMENT_CONFIG.currency,
                    value: PAYMENT_CONFIG.price.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const order = await actions.order.capture();
              handlePaymentSuccess();
            }
          }}
          onError={(err) => {
            setError('Payment failed. Please try again.');
            console.error('PayPal error:', err);
          }}
          onCancel={() => {
            setError('Payment cancelled. Please try again.');
          }}
        />
      </div>
    );
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

          <PayPalScriptProvider
            options={{
              clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
              currency: PAYMENT_CONFIG.currency,
            }}
          >
            <PayPalButtonsWrapper />
          </PayPalScriptProvider>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      )}

      {step === 'processing' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Processing Payment
          </h3>

          <p className="text-slate-600 mb-6 text-lg">
            Please complete your payment in popup window...
          </p>
        </div>
      )}

      {step === 'complete' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Payment Successful!
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
