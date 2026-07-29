'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShieldCheck,
  Users,
  KeyRound,
  CreditCard,
  Building2,
  Database,
  FolderTree,
  Factory,
  Ruler,
  Package,
  Warehouse,
  Boxes,
  ShoppingCart,
  FileCheck,
  TrendingUp,
  Receipt,
  Landmark,
  Wallet,
  BarChart3,
  Settings,
  ChevronDown,
  X,
  Boxes as LogoIcon,
  Lock,
} from 'lucide-react';
import { NavGroup } from '@/types/navigation';

export const navigationConfig: NavGroup[] = [
  {
    groupTitle: 'Overview',
    items: [
      {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    groupTitle: 'Administration',
    items: [
      {
        title: 'Administration',
        href: '/admin',
        icon: ShieldCheck,
        children: [
          { title: 'Users', href: '/admin/users', icon: Users },
          { title: 'Roles', href: '/admin/roles', icon: KeyRound },
          { title: 'Parties', href: '/admin/parties', icon: CreditCard },
          { title: 'Companies', href: '/admin/companies', icon: Building2 },
        ],
      },
    ],
  },
  {
    groupTitle: 'Master Data',
    items: [
      {
        title: 'Masters',
        href: '#',
        icon: Database,
        children: [
          {
            title: 'Product Groups',
            href: '/admin/product-groups',
            icon: FolderTree,
          },
          {
            title: 'Manufacturers',
            href: '/admin/manufacturers',
            icon: Factory,
          },
          {
            title: 'UOM',
            href: '/admin/uom',
            icon: Ruler,
          },
          {
            title: 'Products',
            href: '/admin/products',
            icon: Package,
          },
        ],
      },
    ],
  },
  {
    groupTitle: 'Operations',
    items: [
      {
        title: 'Inventory',
        href: '#',
        icon: Warehouse,
        children: [
          { title: 'Warehouse', href: '/admin/warehouses', icon: Warehouse },
          { title: 'Stock', href: '/admin/stock', icon: Boxes },
        ],
      },
      {
        title: 'Purchase',
        href: '/purchase',
        icon: ShoppingCart,
        children: [
          { title: 'Orders', href: '/purchase/orders', icon: ShoppingCart },
          { title: 'GRN', href: '/purchase/grn', icon: FileCheck },
        ],
      },
      {
        title: 'Sales',
        href: '/sales',
        icon: TrendingUp,
        children: [
          { title: 'Orders', href: '/sales/orders', icon: TrendingUp },
          { title: 'Invoices', href: '/sales/invoices', icon: Receipt },
        ],
      },
      {
        title: 'Finance',
        href: '/finance',
        icon: Landmark,
        children: [
          { title: 'Payments', href: '/finance/payments', icon: Wallet },
          { title: 'Bank', href: '/finance/bank', icon: Landmark },
        ],
      },
    ],
  },
  {
    groupTitle: 'Analytics & System',
    items: [
      { title: 'Reports', href: '/reports', icon: BarChart3 },
      { title: 'Settings', href: '/settings', icon: Settings },
    ],
  },
];

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
}

export function Sidebar({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    Administration: true,
    Masters: true,
    Inventory: true,
    Purchase: false,
    Sales: false,
    Finance: false,
  });

  // 👇 Ye aapke active routes hain jo abhi bane hue hain
  const activeRoutes = [
    '/admin/dashboard',
    '/admin/users',
    '/admin/parties',
    '/admin/companies',
    '/admin/products',
    '/admin/warehouses',
  ];

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-[#001F5B] text-white">
      {/* Header */}
      <div>
        <div className="flex h-16 items-center justify-between border-b border-[#0a2d6b] px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#C02080] text-white">
              <LogoIcon className="h-5 w-5" />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <span className="text-lg font-bold tracking-tight text-white">
                DMS Enterprise
              </span>
            )}
          </Link>
          {isMobileOpen && (
            <button
              onClick={onMobileClose}
              className="text-[#5a6478] hover:text-white lg:hidden"
              aria-label="Close Mobile Sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="custom-scrollbar overflow-y-auto p-3 space-y-6 max-h-[calc(100vh-8rem)]">
          {navigationConfig.map((group, groupIdx) => (
            <div key={groupIdx}>
              {(!isCollapsed || isMobileOpen) && (
                <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-[#5a6478]">
                  {group.groupTitle}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const hasChildren =
                    item.children && item.children.length > 0;
                  const isOpen = !!openSubmenus[item.title];
                  const isActive =
                    pathname === item.href ||
                    item.children?.some((child) => pathname === child.href);

                  const isParentEnabled =
                    activeRoutes.includes(item.href) ||
                    item.children?.some((child) =>
                      activeRoutes.includes(child.href)
                    );

                  return (
                    <div key={item.title}>
                      {hasChildren ? (
                        <button
                          onClick={() => toggleSubmenu(item.title)}
                          className={`group flex w-full items-center justify-between rounded-[12px] px-3 py-2.5 text-xs font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#0a2d6b] text-[#00BFFF]'
                              : 'text-white/80 hover:bg-[#0a2d6b]/60 hover:text-white'
                          } ${!isParentEnabled ? 'opacity-60' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`h-4 w-4 shrink-0 ${
                                isActive ? 'text-[#00BFFF]' : 'text-white/70'
                              }`}
                            />
                            {(!isCollapsed || isMobileOpen) && (
                              <span>{item.title}</span>
                            )}
                          </div>
                          {(!isCollapsed || isMobileOpen) && (
                            <ChevronDown
                              className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          )}
                        </button>
                      ) : (
                        (() => {
                          const isEnabled = activeRoutes.includes(item.href);
                          if (isEnabled) {
                            return (
                              <Link
                                href={item.href}
                                onClick={() =>
                                  isMobileOpen && onMobileClose()
                                }
                                className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-xs font-medium transition-colors ${
                                  pathname === item.href
                                    ? 'bg-[#C02080] text-white shadow-sm'
                                    : 'text-white/80 hover:bg-[#0a2d6b] hover:text-white'
                                }`}
                              >
                                <Icon className="h-4 w-4 shrink-0" />
                                {(!isCollapsed || isMobileOpen) && (
                                  <span>{item.title}</span>
                                )}
                              </Link>
                            );
                          }

                          return (
                            <div
                              title="Coming Soon"
                              className="flex items-center justify-between rounded-[12px] px-3 py-2.5 text-xs font-medium text-white/40 cursor-not-allowed select-none bg-white/[0.02]"
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="h-4 w-4 shrink-0 opacity-40" />
                                {(!isCollapsed || isMobileOpen) && (
                                  <span>{item.title}</span>
                                )}
                              </div>
                              {(!isCollapsed || isMobileOpen) && (
                                <Lock className="h-3 w-3 text-white/30" />
                              )}
                            </div>
                          );
                        })()
                      )}

                      {/* Submenu List */}
                      {hasChildren &&
                        isOpen &&
                        (!isCollapsed || isMobileOpen) && (
                          <div className="mt-1 ml-4 space-y-1 border-l border-[#0a2d6b] pl-3">
                            {item.children?.map((child) => {
                              const ChildIcon = child.icon;
                              const isChildActive = pathname === child.href;
                              const isChildEnabled = activeRoutes.includes(
                                child.href
                              );

                              if (isChildEnabled) {
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() =>
                                      isMobileOpen && onMobileClose()
                                    }
                                    className={`flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-xs transition-colors ${
                                      isChildActive
                                        ? 'bg-[#00BFFF]/10 font-medium text-[#00BFFF]'
                                        : 'text-white/70 hover:bg-[#0a2d6b]/40 hover:text-white'
                                    }`}
                                  >
                                    <ChildIcon className="h-3.5 w-3.5 shrink-0" />
                                    <span>{child.title}</span>
                                  </Link>
                                );
                              }

                              return (
                                <div
                                  key={child.href}
                                  title="Coming Soon"
                                  className="flex items-center justify-between rounded-[12px] px-2.5 py-2 text-xs text-white/30 cursor-not-allowed select-none"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <ChildIcon className="h-3.5 w-3.5 shrink-0 opacity-30" />
                                    <span>{child.title}</span>
                                  </div>
                                  <Lock className="h-3 w-3 text-white/20" />
                                </div>
                              );
                            })}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Profile Card */}
      {(!isCollapsed || isMobileOpen) && (
        <div className="border-t border-[#0a2d6b] p-3">
          <div className="flex items-center gap-3 rounded-[12px] bg-[#0a2d6b]/50 p-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4B0082] text-xs font-bold text-white">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-white">
                System Admin
              </p>
              <p className="truncate text-[10px] text-[#5a6478]">
                admin@dms-enterprise.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside
        className={`hidden border-r border-[#0a2d6b] bg-[#001F5B] transition-all duration-300 lg:block ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#001F5B] transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}