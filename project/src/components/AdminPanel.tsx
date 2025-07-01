import React, { useState } from 'react';
import { Shield, HardDrive, Cpu, MemoryStick, Network, Terminal, AlertTriangle } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [systemInfo] = useState({
    cpu: '85%',
    memory: '68%',
    disk: '42%',
    network: '156 MB/s',
    uptime: '4 дня 12:34:56',
    processes: 247,
  });

  const [permissions, setPermissions] = useState({
    fileSystem: true,
    networkAccess: true,
    systemCommands: false,
    processControl: true,
  });

  const togglePermission = (key: string) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-red-400" />
          <h2 className="text-xl font-bold text-white">Панель администратора</h2>
          <span className="px-2 py-1 bg-red-900/20 text-red-400 text-xs rounded">
            ADMIN
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <p className="text-yellow-400 text-sm">Будьте осторожны при изменении системных настроек</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          
          {/* System Monitoring */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span>Мониторинг системы</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-600 p-3 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">CPU</span>
                  <span className="text-white font-semibold">{systemInfo.cpu}</span>
                </div>
                <div className="w-full bg-gray-500 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: systemInfo.cpu }}></div>
                </div>
              </div>
              
              <div className="bg-gray-600 p-3 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Память</span>
                  <span className="text-white font-semibold">{systemInfo.memory}</span>
                </div>
                <div className="w-full bg-gray-500 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: systemInfo.memory }}></div>
                </div>
              </div>
              
              <div className="bg-gray-600 p-3 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Диск</span>
                  <span className="text-white font-semibold">{systemInfo.disk}</span>
                </div>
                <div className="w-full bg-gray-500 rounded-full h-2 mt-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: systemInfo.disk }}></div>
                </div>
              </div>
              
              <div className="bg-gray-600 p-3 rounded">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Сеть</span>
                  <span className="text-white font-semibold">{systemInfo.network}</span>
                </div>
                <div className="flex items-center space-x-1 mt-2">
                  <Network className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">Активно</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gray-600 rounded">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-300">Время работы:</span>
                  <span className="text-white ml-2">{systemInfo.uptime}</span>
                </div>
                <div>
                  <span className="text-gray-300">Процессы:</span>
                  <span className="text-white ml-2">{systemInfo.processes}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Permissions */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-red-400" />
              <span>Права доступа</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-600 rounded">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-orange-400" />
                  <span className="text-gray-300">Доступ к файловой системе</span>
                </div>
                <button
                  onClick={() => togglePermission('fileSystem')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    permissions.fileSystem ? 'bg-red-600' : 'bg-gray-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      permissions.fileSystem ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-600 rounded">
                <div className="flex items-center space-x-2">
                  <Network className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Сетевой доступ</span>
                </div>
                <button
                  onClick={() => togglePermission('networkAccess')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    permissions.networkAccess ? 'bg-red-600' : 'bg-gray-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      permissions.networkAccess ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-600 rounded">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Системные команды</span>
                </div>
                <button
                  onClick={() => togglePermission('systemCommands')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    permissions.systemCommands ? 'bg-red-600' : 'bg-gray-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      permissions.systemCommands ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-600 rounded">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Управление процессами</span>
                </div>
                <button
                  onClick={() => togglePermission('processControl')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    permissions.processControl ? 'bg-red-600' : 'bg-gray-500'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      permissions.processControl ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* System Actions */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h3 className="text-white font-semibold mb-4">Системные действия</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Перезапустить службы
              </button>
              <button className="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Очистить кэш
              </button>
              <button className="px-4 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                Создать резервную копию
              </button>
              <button className="px-4 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Экстренная остановка
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;