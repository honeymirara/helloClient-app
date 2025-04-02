import { createContext, useContext } from 'react';

interface SideMenuContextType {
  isCollapsed: boolean;
}

export const SideMenuContext = createContext<SideMenuContextType>({ isCollapsed: false });

export const useSideMenu = () => useContext(SideMenuContext);