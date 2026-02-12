import React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';

const variants = {
  info: {
    icon: Info,
    className: 'border-blue-500/30 bg-blue-500/5 text-blue-200',
    iconClassName: 'text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-200',
    iconClassName: 'text-yellow-400',
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-500/30 bg-green-500/5 text-green-200',
    iconClassName: 'text-green-400',
  },
  error: {
    icon: XCircle,
    className: 'border-red-500/30 bg-red-500/5 text-red-200',
    iconClassName: 'text-red-400',
  },
};

export function Callout({ type = 'info', title, children }) {
  const variant = variants[type] || variants.info;
  const Icon = variant.icon;

  return (
    <div className={`my-6 rounded-lg border p-4 ${variant.className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${variant.iconClassName}`} />
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
