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
    if (hasSubItems) {
      setIsExpanded(!isExpanded);
    } else {
      onItemClick(id);
    }
  };

  const showSubmenu = isCollapsed ? isHovered : isExpanded;

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={(e) => {
        // Проверяем, не навели ли мы на подменю
        const relatedTarget = e.relatedTarget as HTMLElement;
        const isHoveringSubmenu = relatedTarget?.closest('.submenu-container');
        if (!isHoveringSubmenu) {
          setIsHovered(false);
        }
      }}
    >
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
        <span className={`
          text-lg
          ${isCollapsed ? '' : 'mr-3'}
          ${isActive || isParentActive ? 'text-blue-500' : ''}
        `}>
          {icon}
        </span>

        {!isCollapsed && (
          <>
            <span className="flex-1 text-sm font-medium">{children}</span>
            {hasSubItems && (
              <span className={`
                ml-2 transition-transform duration-200
                ${isExpanded ? 'rotate-90' : ''}
              `}>
                ▶
              </span>
            )}
          </>
        )}
      </div>

      {hasSubItems && showSubmenu && (
        <div 
          className={`
            submenu-container
            overflow-hidden
            transition-all duration-200
            ${isCollapsed 
              ? `
                absolute left-full top-0 
                bg-white shadow-lg rounded-lg 
                min-w-[200px] border
                hover:block
              ` 
              : 'bg-blue-50/50'
            }
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {subItems.map((subItem) => (
            <div
              key={subItem.id}
              onClick={(e) => {
                e.stopPropagation();
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