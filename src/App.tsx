import React, { useState } from 'react';
import { SideMenu, MenuItem } from './components/SideMenu';

interface ActiveItem {
  mainId: string;
  subId?: string;
}

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<ActiveItem>({ mainId: 'home' });

  const handleItemClick = (itemId: string, subItemId?: string) => {
    setActiveItem({ mainId: itemId, subId: subItemId });
  };

  const menuItems = [
    {
      id: 'home',
      label: 'Главная',
      icon: '🏠'
    },
    {
      id: 'projects',
      label: 'Проекты',
      icon: '📁',
      subItems: [
        { id: 'project1', label: 'Веб-приложение', icon: '🌐' },
        { id: 'project2', label: 'Мобильное приложение', icon: '📱' },
        { id: 'project3', label: 'Десктоп приложение', icon: '💻' }
      ]
    },
    {
      id: 'tasks',
      label: 'Задачи',
      icon: '✓',
      subItems: [
        { id: 'active', label: 'Активные', icon: '🔵' },
        { id: 'completed', label: 'Завершенные', icon: '✅' }
      ]
    },
    {
      id: 'settings',
      label: 'Настройки',
      icon: '⚙️'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideMenu 
        isCollapsed={isCollapsed}
        onCollapsedChange={setIsCollapsed}
      >
        {/* Логотип или заголовок */}
        <div className={`
          p-4 border-b
          ${isCollapsed ? 'text-center' : ''}
        `}>
          <span className="text-xl font-bold text-blue-600">
            {isCollapsed ? '🚀' : 'Dashboard'}
          </span>
        </div>

        {/* Пункты меню */}
        <div className="py-2">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              isActive={activeItem.mainId === item.id && !activeItem.subId}
              subItems={item.subItems}
              activeSubItemId={
                activeItem.mainId === item.id ? activeItem.subId : undefined
              }
              onItemClick={handleItemClick}
            >
              {item.label}
            </MenuItem>
          ))}
        </div>
      </SideMenu>

      {/* Основной контент */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {menuItems.find(item => item.id === activeItem.mainId)?.label}
            {activeItem.subId && ' → '}
            {activeItem.subId && 
              menuItems
                .find(item => item.id === activeItem.mainId)
                ?.subItems?.find(sub => sub.id === activeItem.subId)?.label
            }
          </h1>
          <p className="text-gray-600">
            Выбранный раздел: {activeItem.mainId}
            {activeItem.subId && ` / ${activeItem.subId}`}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;