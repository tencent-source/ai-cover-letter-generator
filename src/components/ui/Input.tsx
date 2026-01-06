import React from 'react';
import { cn } from '@/utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2 border rounded-lg transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder:text-gray-400',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 hover:border-gray-400',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({
  label,
  error,
  helperText,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-2 border rounded-lg transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'placeholder:text-gray-400 resize-none',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 hover:border-gray-400',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
