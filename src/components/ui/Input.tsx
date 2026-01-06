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
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
          'placeholder:text-slate-400 text-slate-900',
          'hover:border-slate-400',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-slate-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-slate-500">{helperText}</p>
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
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-3 border rounded-xl transition-all duration-200 bg-white',
          'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
          'placeholder:text-slate-400 resize-none text-slate-900',
          'hover:border-slate-400',
          error
            ? 'border-red-400 focus:ring-red-400'
            : 'border-slate-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  );
}
