import React, { useEffect, useState } from 'react';
import { SideMenuProps } from './types';
import SideMenuContext from './SideMenuContext';

export const SideMenu: React.FC<SideMenuProps> = ({
  children,
  isCollapsed = false,
  onCollapsedChange
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      }
    };

    // Инициализация
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SideMenuContext.Provider value={{ 
      isCollapsed: isMobile ? false : isCollapsed,
      isMobile,
      isOpen,
      setIsOpen
    }}>
      {/* Мобильная кнопка меню */}
      {isMobile && (
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="fixed left-4 top-[300px] z-50 w-10 h-10 
               bg-white rounded-full shadow-lg 
               flex items-center justify-center
               hover:bg-gray-50 transition-colors
               border border-gray-200"
    aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
  >
    {isOpen ? '✕' : '☰'}
  </button>
)}

      {/* Основное меню */}
      <div className={`
        ${isMobile ? 'fixed left-0 top-0 h-full z-40' : 'relative min-h-screen'}
        bg-white border-r shadow-lg
        transition-all duration-300 ease-in-out
        ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''}
        ${!isMobile && isCollapsed ? 'w-16' : 'w-64'}
      `}>
        {/* Кнопка сворачивания (только для десктопа) */}
        {!isMobile && (
          <button
            onClick={() => onCollapsedChange?.(!isCollapsed)}
            className="absolute -right-3 top-6 w-6 h-6 bg-white border rounded-full
                     shadow-sm flex items-center justify-center hover:bg-gray-50
                     transition-colors z-10"
            aria-label={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        )}

        {children}
      </div>

      {/* Оверлей для мобильной версии */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </SideMenuContext.Provider>
  );
};