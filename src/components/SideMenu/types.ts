import { ReactNode } from 'react';

export interface SubMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface MenuItemProps {
  id: string;
  children: ReactNode;
  icon?: ReactNode;
  isActive?: boolean;
  subItems?: SubMenuItem[];
  activeSubItemId?: string;
  onItemClick: (itemId: string, subItemId?: string) => void;
}

export interface SideMenuProps {
  children: ReactNode;
  isCollapsed?: boolean;
  onCollapsedChange?: (isCollapsed: boolean) => void;
}

export interface SideMenuContextType {
  isCollapsed: boolean;
}