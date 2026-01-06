import React, { useState } from 'react';
import { Copy, Download, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { copyToClipboard } from '@/utils/helpers';

interface CoverLetterDisplayProps {
  coverLetter: string;
  onRegenerate: () => void;
}

export function CoverLetterDisplay({ coverLetter, onRegenerate }: CoverLetterDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(coverLetter);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
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

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await onRegenerate();
    setIsRegenerating(false);
  };

  return (
    <Card hover>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Cover Letter</CardTitle>
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
            <Button variant="primary" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              Download
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
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Review and personalize your cover letter before sending. 
            Add your signature and contact information at the bottom.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
