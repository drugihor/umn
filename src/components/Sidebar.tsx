import React from 'react';
import { 
  Bot, 
  Terminal, 
  Settings, 
  Code, 
  Database, 
  Cloud, 
  Shield, 
  FileText,
  Activity,
  Zap,
  Search
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'chat', icon: Bot, label: 'ИИ Агент', color: 'text-blue-400' },
    { id: 'parser', icon: Search, label: 'Парсер', color: 'text-purple-400' },
    { id: 'terminal', icon: Terminal, label: 'Терминал', color: 'text-green-400' },
    { id: 'tasks', icon: FileText, label: 'Задачи', color: 'text-purple-400' },
    { id: 'code', icon: Code, label: 'Редактор кода', color: 'text-orange-400' },
    { id: 'api', icon: Database, label: 'API', color: 'text-cyan-400' },
    { id: 'deploy', icon: Cloud, label: 'Развертывание', color: 'text-indigo-400' },
    { id: 'settings', icon: Settings, label: 'Настройки', color: 'text-gray-400' },
    { id: 'admin', icon: Shield, label: 'Администратор', color: 'text-red-400' },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">ИИ Агент</h1>
            <p className="text-gray-400 text-sm">Версия 2.0</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gray-800 text-white border-l-4 border-blue-500'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${item.color}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Activity className="w-4 h-4 text-green-400" />
          <span>Система активна</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;