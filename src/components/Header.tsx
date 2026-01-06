import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-800 shadow-sm border-b border-slate-700">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-slate-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                AI Cover Letter Generator
              </h1>
              <p className="text-xs text-slate-400">
                Professional cover letters powered by AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Sparkles className="w-4 h-4 text-slate-500" />
            <span>Powered by Groq AI</span>
          </div>
        </div>
      </div>
    </header>
  );
}
