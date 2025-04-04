import React from 'react';
import { SideMenuProps } from './types';
import SideMenuContext from './SideMenuContext';

export const SideMenu: React.FC<SideMenuProps> = ({
  children,
  isCollapsed = false,
  onCollapsedChange
}) => {
  return (
    <SideMenuContext.Provider value={{ isCollapsed }}>
      <div className={`
        relative
        min-h-screen
        bg-white
        border-r
        shadow-sm
        transition-all
        duration-300
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        {/* Кнопка сворачивания */}
        <button
          onClick={() => onCollapsedChange?.(!isCollapsed)}
          className={`
            absolute
            -right-3
            top-6
            w-6
            h-6
            bg-white
            border
            rounded-full
            shadow-sm
            flex
            items-center
            justify-center
            hover:bg-gray-50
            transition-colors
            z-10
          `}
          aria-label={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
        >
          {isCollapsed ? '→' : '←'}
        </button>

        {children}
      </div>
    </SideMenuContext.Provider>
  );
};