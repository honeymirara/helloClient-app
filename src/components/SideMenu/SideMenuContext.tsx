import { createContext, useContext } from 'react';
import { SideMenuContextType } from './types';

const SideMenuContext = createContext<SideMenuContextType>({
  isCollapsed: false
});

export const useSideMenu = () => {
  const context = useContext(SideMenuContext);
  if (!context) {
    throw new Error('useSideMenu must be used within a SideMenuProvider');
  }
  return context;
};

export default SideMenuContext;