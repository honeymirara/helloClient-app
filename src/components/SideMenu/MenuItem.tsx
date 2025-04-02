import React, { useState } from 'react';
import { MenuItemProps } from './types';
import { useSideMenu } from './SideMenuContext';
import { SubMenu } from './SubMenu';

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon,
  isActive,
  onClick,
  subItems
}) => {
  const { isCollapsed } = useSideMenu();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  
  // Обработчик наведения для свёрнутого меню
  const handleMouseEnter = () => {
    if (isCollapsed && subItems) {
      setIsSubMenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed && subItems) {
      setIsSubMenuOpen(false);
    }
  };

  // Обработчик клика
  const handleClick = () => {
    if (subItems) {
      // Если есть подменю, переключаем его видимость
      if (!isCollapsed) {
        setIsSubMenuOpen(!isSubMenuOpen);
      }
    } else {
      // Если нет подменю, вызываем обычный onClick
      onClick?.();
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Основной пункт меню */}
      <div
        role="menuitem"
        onClick={handleClick}
        className={`
          flex items-center p-3 cursor-pointer
          ${isActive ? 'bg-yellow-100' : 'hover:bg-gray-100'}
        `}
      >
        {/* Иконка */}
        {icon && <span className="mr-3">{icon}</span>}
        
        {/* Текст и стрелка (если не свёрнуто) */}
        {!isCollapsed && (
          <>
            <span className="flex-1">{children}</span>
            {subItems && (
              <span className={`
                transform transition-transform
                ${isSubMenuOpen ? 'rotate-90' : ''}
              `}>
                ▶
              </span>
            )}
          </>
        )}
      </div>

      {/* Подменю */}
      {subItems && (
        <SubMenu
          items={subItems}
          isOpen={isSubMenuOpen}
          onItemClick={(id) => {
            onClick?.();
            setIsSubMenuOpen(false);
          }}
        />
      )}
    </div>
  );
};