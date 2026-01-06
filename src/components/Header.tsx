import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              CoverLetter<span className="bg-gradient-to-r from-emerald-600 to-blue-600 text-transparent bg-clip-text">.ai</span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
