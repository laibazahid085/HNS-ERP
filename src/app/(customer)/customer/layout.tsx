import * as React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Package,
  FileText,
  User,
  LogOut,
  Bell,
  Layers,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "My Orders", href: "/customer/orders", icon: ShoppingBag },
    { label: "Catalog", href: "/customer/catalog", icon: Package },
    { label: "Invoices", href: "/customer/invoices", icon: FileText },
  ];

  return (
    <div className="min-h-screen w-full flex bg-[var(--cream-dark)] text-[var(--ink)] font-[family-name:var(--font-body)]">
      {/* Customer Sidebar */}
      <aside className="w-64 bg-[var(--cream)] text-[var(--ink)] hidden md:flex flex-col justify-between border-r border-[var(--slate)]/15">
        <div className="p-4 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="h-9 w-9 rounded-lg bg-[var(--ink)] flex items-center justify-center text-[var(--cream)] shadow-sm">
              <Layers className="h-5 w-5 text-[var(--cyan)]" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-none text-[var(--ink)]">
                DMS Portal
              </span>
              <span className="text-[10px] text-[var(--gold)] font-semibold uppercase tracking-wider">
                Customer Suite
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius)] text-xs font-semibold text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--cream-dark)] transition-colors"
                >
                  <Icon className="h-4 w-4 text-[var(--gold)]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[var(--slate)]/10">
          <Button
            variant="ghost"
            className="w-full justify-start text-xs text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--cream-dark)] gap-2"
          >
            <LogOut className="h-4 w-4 text-[var(--gold)]" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Customer Header */}
        <header className="h-16 bg-[var(--cream)] border-b border-[var(--slate)]/10 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[var(--ink)]">
              Customer Portal
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[var(--slate)] hover:text-[var(--ink)]"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 border-l border-[var(--slate)]/10 pl-4">
              <div className="h-8 w-8 rounded-full bg-[var(--cream-dark)] border border-[var(--slate)]/20 flex items-center justify-center text-[var(--ink)]">
                <User className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-[var(--ink)] hidden sm:inline-block">
                Customer Account
              </span>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}