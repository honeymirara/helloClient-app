import { ReactNode } from 'react';

// Тип для элемента подменю
export interface SubMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

// Основные пропсы пункта меню
export interface MenuItemProps {
  children: ReactNode;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  subItems?: SubMenuItem[];    // Добавляем подменю
}

// Пропсы основного компонента меню
export interface SideMenuProps {
  children: ReactNode;
  isCollapsed?: boolean;
}