'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Menu,
  Search,
  PanelLeftClose,
  PanelLeft,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onMobileMenuOpen: () => void;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
}

export function Header({
  onMobileMenuOpen,
  onToggleCollapse,
  isCollapsed,
}: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#f0f2f7] dark:border-[#0a2d6b] bg-white dark:bg-[#001f5b] px-4 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Drawer Toggle */}
        <button
          onClick={onMobileMenuOpen}
          className="text-[#001F5B] dark:text-white hover:text-[#00BFFF] lg:hidden"
          aria-label="Open Mobile Drawer"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden text-[#001F5B] dark:text-white hover:text-[#00BFFF] lg:block"
          aria-label="Toggle Sidebar Collapse"
        >
          {isCollapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>

        {/* Search */}
        <div className="hidden sm:w-72 md:w-80 sm:block">
          <Input
            placeholder="Search orders, products, clients..."
            icon={<Search className="h-4 w-4" />}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dark / Light Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-amber-400" />
          ) : (
            <Moon className="h-5 w-5 text-[#001F5B]" />
          )}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-[#001F5B] dark:text-white" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#C02080]" />
        </Button>

        <div className="h-6 w-px bg-[#f0f2f7] dark:bg-[#0a2d6b]" />

        {/* User Dropdown */}
        <DropdownMenu
          trigger={
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001F5B] text-xs font-bold text-white">
                AD
              </div>
              <div className="hidden text-left md:block">
                <p className="text-xs font-semibold text-[#001F5B] dark:text-white">
                  Admin User
                </p>
                <p className="text-[10px] text-[#5a6478] dark:text-[#a0aec0]">
                  Super Administrator
                </p>
              </div>
            </div>
          }
        >
          <div className="border-b border-[#f0f2f7] dark:border-[#0a2d6b] px-3 py-2">
            <p className="text-xs font-semibold text-[#001F5B] dark:text-white">
              Admin User
            </p>
            <p className="text-[10px] text-[#5a6478] dark:text-[#a0aec0]">
              admin@dms-enterprise.com
            </p>
          </div>
          <DropdownMenuItem>
            <User className="h-3.5 w-3.5" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Shield className="h-3.5 w-3.5" />
            <span>Role Permissions</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="h-3.5 w-3.5" />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <div className="my-1 border-t border-[#f0f2f7] dark:border-[#0a2d6b]" />
          <DropdownMenuItem className="text-rose-600 dark:text-rose-400">
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
    </header>
  );
}