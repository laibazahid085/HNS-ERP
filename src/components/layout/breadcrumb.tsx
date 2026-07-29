'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const pathname = usePathname();

  // Hide route groups like admin and customer
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .filter((segment) => !['admin', 'customer'].includes(segment));

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1.5 text-xs text-[#5a6478] dark:text-[#a0aec0]"
    >
      <Link
        href="/admin/dashboard"
        className="flex items-center gap-1 transition-colors hover:text-[#00BFFF]"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;

        // Build href without hidden segments
        const href =
          '/admin/' + segments.slice(0, index + 1).join('/');

        const formattedName = segment
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return (
          <div key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-[#5a6478]/50" />

            {isLast ? (
              <span className="font-semibold text-[#001F5B] dark:text-white">
                {formattedName}
              </span>
            ) : (
              <Link
                href={href}
                className="transition-colors hover:text-[#00BFFF]"
              >
                {formattedName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}