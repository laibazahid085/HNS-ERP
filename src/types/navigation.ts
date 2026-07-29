import { LucideIcon } from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  children?: Omit<NavItem, 'children'>[];
}

export interface NavGroup {
  groupTitle: string;
  items: NavItem[];
}