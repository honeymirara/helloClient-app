import React from 'react';
import { useSideMenu } from './SideMenuContext';

interface MenuContentProps {
  children: React.ReactNode;
}

export const MenuContent: React.FC<MenuContentProps> = ({ children }) => {
  // const { isOpen } = useSideMenu();

  return (
    // <div
    //   id="side-menu-content"
    //   role="menu"
    //   aria-hidden={!isOpen}
    // >
    //   {children}
    // </div>
    <></>
  );
};