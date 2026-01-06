import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { STORAGE_KEYS, VERIFICATION_CONFIG } from '@/utils/constants';

interface PaymentStatus {
  isPaid: boolean;
  timestamp: number;
  expiresAt: number;
}

interface AppContextType {
  isPaid: boolean;
  isLoading: boolean;
  verifyPayment: () => void;
  markAsPaid: () => void;
  resetPayment: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.paymentStatus);
      if (stored) {
        const status: PaymentStatus = JSON.parse(stored);
        
        if (status.isPaid && Date.now() < status.expiresAt) {
          setIsPaid(true);
        } else {
          localStorage.removeItem(STORAGE_KEYS.paymentStatus);
          setIsPaid(false);
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = () => {
    checkPaymentStatus();
  };

  const markAsPaid = () => {
    const status: PaymentStatus = {
      isPaid: true,
      timestamp: Date.now(),
      expiresAt: Date.now() + VERIFICATION_CONFIG.validityDuration,
    };
    
    localStorage.setItem(STORAGE_KEYS.paymentStatus, JSON.stringify(status));
    setIsPaid(true);
  };

  const resetPayment = () => {
    localStorage.removeItem(STORAGE_KEYS.paymentStatus);
    setIsPaid(false);
  };

  return (
    <AppContext.Provider
      value={{
        isPaid,
        isLoading,
        verifyPayment,
        markAsPaid,
        resetPayment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
