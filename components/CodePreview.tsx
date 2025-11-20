import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  onClose: () => void;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ code, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 border border-zinc-200 dark:border-white/10 rounded-2xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-white/10">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Exported Code</h3>
          <div className="flex items-center gap-2">
             <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-zinc-50 dark:bg-[#0d1117]">
          <pre className="text-sm font-mono text-zinc-700 dark:text-gray-300 whitespace-pre-wrap">
            {code}
          </pre>
        </div>
      </div>
    </div>
  );
};