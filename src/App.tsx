import { useState } from 'react';
import { SideMenu, MenuItem } from './components/SideMenu';

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  // Пример данных для подменю
  const projectSubItems = [
    { id: 'project1', label: 'Проект 1', icon: '📁' },
    { id: 'project2', label: 'Проект 2', icon: '📁' },
    { id: 'project3', label: 'Проект 3', icon: '📁' },
  ];

  const settingsSubItems = [
    { id: 'profile', label: 'Профиль', icon: '👤' },
    { id: 'security', label: 'Безопасность', icon: '🔒' },
    { id: 'notifications', label: 'Уведомления', icon: '🔔' },
  ];

  return (
    <div className="flex min-h-screen">
      <SideMenu isCollapsed={isCollapsed}>
        {/* Кнопка сворачивания */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full p-3 text-left hover:bg-gray-100 border-b"
        >
          {isCollapsed ? '≡' : 'Свернуть меню'}
        </button>

        {/* Пункты меню */}
        <MenuItem
          icon="🏠"
          isActive={activeItem === 'home'}
          onClick={() => setActiveItem('home')}
        >
          Главная
        </MenuItem>

        <MenuItem
          icon="📁"
          isActive={activeItem.startsWith('project')}
          subItems={projectSubItems}
          onClick={() => setActiveItem('projects')}
        >
          Проекты
        </MenuItem>

        <MenuItem
          icon="⚙️"
          isActive={activeItem.startsWith('settings')}
          subItems={settingsSubItems}
          onClick={() => setActiveItem('settings')}
        >
          Настройки
        </MenuItem>
      </SideMenu>

      {/* Основной контент */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">
          {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          {isCollapsed ? 'Развернуть' : 'Свернуть'} меню
        </button>
      </main>
    </div>
  );
};

export default App;