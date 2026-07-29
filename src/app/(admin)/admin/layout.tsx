"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from '@/components/layout/breadcrumb';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-white text-[#001F5B]">
      {/* Sidebar Component */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
      />

      {/* Main Wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          onMobileMenuOpen={() => setIsMobileOpen(true)}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          isCollapsed={isCollapsed}
        />

        {/* Content Region */}
        <main className="flex-1 overflow-y-auto bg-white p-4 sm:p-6">
          <Breadcrumb />
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}