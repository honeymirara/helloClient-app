import React from 'react';
import { SubMenuItem } from './types';
import { useSideMenu } from './SideMenuContext';

interface SubMenuProps {
  items: SubMenuItem[];
  isOpen: boolean;
  onItemClick: (id: string) => void;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  items,
  isOpen,
  onItemClick
}) => {
  const { isCollapsed } = useSideMenu();

  // Если меню свёрнуто, показываем подменю при наведении
  const menuStyles = isCollapsed
    ? 'absolute left-full top-0 ml-1 bg-white shadow-lg rounded-md'
    : 'mt-1 ml-8 border-l';

  if (!isOpen && !isCollapsed) return null;

  return (
    <div className={menuStyles}>
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
        >
          {item.icon && <span className="mr-3">{item.icon}</span>}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};