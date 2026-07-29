import * as React from 'react';

export type OrderStatus =
  | 'Pending'
  | 'Approved'
  | 'Packed'
  | 'Dispatched'
  | 'Delivered'
  | 'Cancelled'
  | 'Low Stock'
  | 'Critical';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: OrderStatus | 'default' | 'cyan' | 'purple';
}

export function Badge({
  className = '',
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const styles: Record<string, string> = {
    Pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
    Approved: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
    Packed: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400',
    Dispatched: 'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400',
    Delivered: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
    Cancelled: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400',
    'Low Stock': 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
    Critical: 'bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400',
    default: 'bg-[#f0f2f7] dark:bg-[#0a2d6b] text-[#001F5B] dark:text-white border-[#f0f2f7]',
    cyan: 'bg-[#00BFFF]/10 text-[#001F5B] dark:text-[#00BFFF] border-[#00BFFF]/30',
    purple: 'bg-[#4B0082]/10 text-[#4B0082] dark:text-purple-400 border-[#4B0082]/20',
  };

  const selectedStyle = styles[variant] || styles.default;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${selectedStyle} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}