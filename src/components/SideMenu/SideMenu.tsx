import React from 'react';
import { SideMenuProps } from './types';
import { SideMenuContext } from './SideMenuContext';

export const SideMenu: React.FC<SideMenuProps> = ({
  children,
  isCollapsed = false
}) => {
  return (
    <SideMenuContext.Provider value={{ isCollapsed }}>
      <div className={`
        bg-white border-r h-screen
        ${isCollapsed ? 'w-16' : 'w-64'}
        transition-width duration-300
      `}>
        {children}
      </div>
    </SideMenuContext.Provider>
  );
};