import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AI Cover Letter Generator
              </h1>
              <p className="text-xs text-gray-500">
                Professional cover letters powered by AI
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span>Powered by Groq AI</span>
          </div>
        </div>
      </div>
    </header>
  );
}
