import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);

  const codeString = typeof children === 'string'
    ? children
    : children?.props?.children || '';

  const language = className?.replace('language-', '')
    || children?.props?.className?.replace('language-', '')
    || '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-border bg-[#0d1117]">
      {language && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-border text-xs text-muted-foreground">
          <span className="font-mono">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      )}
      <pre className={`overflow-x-auto p-4 text-sm ${className || ''}`}>
        {children}
      </pre>
    </div>
  );
}
