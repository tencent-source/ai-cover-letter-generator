import React, { useState, useEffect } from 'react';
import { Copy, Download, CheckCircle, RefreshCw, FileText, History, Clock, Mail } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { copyToClipboard } from '@/utils/helpers';
import { jsPDF } from 'jspdf';
import { getHistory, type HistoryItem } from '@/utils/history';

interface CoverLetterDisplayProps {
  coverLetter: string;
  onRegenerate: () => void;
  onLoadHistory?: (coverLetter: string) => void;
}

export function CoverLetterDisplay({ coverLetter, onRegenerate, onLoadHistory }: CoverLetterDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const wordCount = coverLetter.trim().split(/\s+/).length;
  const charCount = coverLetter.length;

  useEffect(() => {
    setHistory(getHistory());
  }, [coverLetter]);

  const handleCopy = async () => {
    const success = await copyToClipboard(coverLetter);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([coverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cover-letter.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margins = 20;
    const maxWidth = pageWidth - (margins * 2);
    
    // Split text into lines that fit the page width
    const lines = doc.splitTextToSize(coverLetter, maxWidth);
    
    // Add text to PDF
    doc.setFontSize(11);
    doc.text(lines, margins, margins);
    
    // Save PDF
    doc.save('cover-letter.pdf');
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await onRegenerate();
    setIsRegenerating(false);
  };

  return (
    <Card hover>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Cover Letter</CardTitle>
            <p className="text-sm text-slate-500 mt-1">
              {wordCount} words • {charCount} characters
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleRegenerate}
              loading={isRegenerating}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Regenerate
            </Button>
            <Button variant="primary" size="sm" onClick={handleDownloadPDF}>
              <FileText className="w-4 h-4 mr-1" />
              Download PDF
            </Button>
            <Button variant="secondary" size="sm" onClick={handleDownloadTxt}>
              <Download className="w-4 h-4 mr-1" />
              TXT
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowEmailPreview(!showEmailPreview)}
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          <div className="absolute top-0 right-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-1"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 whitespace-pre-wrap text-gray-800 leading-relaxed border border-gray-200">
            {coverLetter}
          </div>
        </div>

        {/* Email Preview */}
        {showEmailPreview && (
          <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Email Preview
            </h4>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600">Subject Line:</label>
                <p className="text-sm text-slate-900 font-medium mt-1">
                  Application for [Job Title] Position
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600">Email Body:</label>
                <div className="mt-1 p-4 bg-white rounded-lg text-sm text-slate-800 border border-slate-200">
                  <p className="mb-3">Dear Hiring Manager,</p>
                  <p className="mb-3">
                    I am writing to express my interest in the [Job Title] position at [Company Name]. 
                    Please find my cover letter below.
                  </p>
                  <div className="pl-4 border-l-4 border-blue-300 my-4 text-xs whitespace-pre-line">
                    {coverLetter}
                  </div>
                  <p className="mt-3">
                    I have also attached my resume for your review. I look forward to discussing 
                    how my skills and experience align with your needs.
                  </p>
                  <p className="mt-3">Best regards,<br />[Your Name]</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic">
                💡 Tip: Copy this format when sending your application via email
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Review and personalize your cover letter before sending. 
            Add your signature and contact information at the bottom.
          </p>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
            >
              <History className="w-4 h-4" />
              Recent Cover Letters ({history.length})
            </button>
            
            {showHistory && (
              <div className="mt-3 space-y-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer"
                    onClick={() => onLoadHistory && onLoadHistory(item.coverLetter)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">
                          {item.jobTitle} at {item.companyName}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleDateString()} at{' '}
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
