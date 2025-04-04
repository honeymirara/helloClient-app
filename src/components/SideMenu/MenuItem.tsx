import React, { useState } from 'react';
import { MenuItemProps } from './types';
import { useSideMenu } from './SideMenuContext';

export const MenuItem: React.FC<MenuItemProps> = ({
  id,
  children,
  icon,
  isActive,
  subItems,
  activeSubItemId,
  onItemClick
}) => {
  const { isCollapsed } = useSideMenu();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const hasSubItems = subItems && subItems.length > 0;
  const isParentActive = hasSubItems && activeSubItemId !== undefined;

  const handleClick = () => {
    if (hasSubItems && !isCollapsed) {
      setIsExpanded(!isExpanded);
    } else if (!hasSubItems) {
      onItemClick(id);
    }
  };

  const showSubmenu = isCollapsed ? isHovered : isExpanded;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Основной пункт меню */}
      <div
        role="menuitem"
        onClick={handleClick}
        className={`
          flex items-center px-4 py-3 cursor-pointer
          transition-all duration-200
          ${isActive || isParentActive 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-50'
          }
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        {/* Иконка */}
        <span className={`
          text-lg
          ${isCollapsed ? '' : 'mr-3'}
          ${isActive || isParentActive ? 'text-blue-500' : ''}
        `}>
          {icon}
        </span>

        {/* Текст и стрелка */}
        {!isCollapsed && (
          <>
            <span className="flex-1 text-sm font-medium">{children}</span>
            {hasSubItems && (
              <span className={`
                ml-2
                transition-transform duration-200
                ${isExpanded ? 'rotate-90' : ''}
              `}>
                ▶
              </span>
            )}
          </>
        )}
      </div>

      {/* Подменю */}
      {hasSubItems && showSubmenu && (
        <div 
          className={`
            overflow-hidden
            transition-all duration-200
            ${isCollapsed 
              ? `
                absolute left-full top-0 
                bg-white shadow-lg rounded-lg
                min-w-[200px] border
                mt-0
              ` 
              : 'bg-blue-50/50'
            }
          `}
          style={{
            // Позиционируем подменю рядом с пунктом меню в свёрнутом состоянии
            ...(isCollapsed && {
              top: '0',
              left: '100%',
              marginLeft: '0.5rem' // небольшой отступ от основного меню
            })
          }}
        >
          {subItems.map((subItem) => (
            <div
              key={subItem.id}
              onClick={(e) => {
                e.stopPropagation(); // Предотвращаем всплытие события
                onItemClick(id, subItem.id);
              }}
              className={`
                flex items-center px-4 py-2 cursor-pointer
                transition-colors
                ${isCollapsed ? '' : 'pl-12'}
                ${activeSubItemId === subItem.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'hover:bg-blue-50/50 text-gray-600'
                }
              `}
            >
              {subItem.icon && (
                <span className="mr-3 text-lg">{subItem.icon}</span>
              )}
              <span className="text-sm">{subItem.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};