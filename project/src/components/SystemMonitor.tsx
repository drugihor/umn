import React from 'react';
import { useElectron } from '../hooks/useElectron';
import { Monitor, Cpu, HardDrive, Wifi } from 'lucide-react';

const SystemMonitor: React.FC = () => {
  const { systemInfo, systemUpdate, isElectron } = useElectron();

  if (!isElectron || !systemInfo) {
    return (
      <div className="p-4 bg-gray-700 rounded-lg">
        <p className="text-gray-400">Системный мониторинг доступен только в десктопной версии</p>
      </div>
    );
  }

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}д ${hours}ч ${minutes}м`;
  };

  const memoryUsagePercent = systemUpdate 
    ? Math.round((systemUpdate.memory.system.total - systemUpdate.memory.system.free) / systemUpdate.memory.system.total * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Monitor className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold">Система</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">ОС:</span>
              <span className="text-white">{systemInfo.platform} {systemInfo.arch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Хост:</span>
              <span className="text-white">{systemInfo.hostname}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Время работы:</span>
              <span className="text-white">{formatUptime(systemInfo.uptime)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <HardDrive className="w-5 h-5 text-green-400" />
            <h3 className="text-white font-semibold">Память</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Использовано:</span>
              <span className="text-white">{memoryUsagePercent}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${memoryUsagePercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatBytes(systemInfo.memory.total - systemInfo.memory.free)}</span>
              <span>{formatBytes(systemInfo.memory.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Cpu className="w-5 h-5 text-purple-400" />
          <h3 className="text-white font-semibold">Процессоры ({systemInfo.cpus.length})</h3>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {systemInfo.cpus.slice(0, 4).map((cpu, index) => (
            <div key={index} className="text-xs">
              <div className="flex justify-between text-gray-300">
                <span>CPU {index + 1}:</span>
                <span>{cpu.model.split(' ')[0]} {Math.round(cpu.speed / 1000 * 100) / 100} GHz</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Wifi className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-semibold">Сетевые интерфейсы</h3>
        </div>
        <div className="space-y-2">
          {Object.entries(systemInfo.networkInterfaces).map(([name, interfaces]: [string, any]) => (
            <div key={name} className="text-sm">
              <div className="text-gray-300 font-medium">{name}:</div>
              {interfaces.filter((iface: any) => !iface.internal).map((iface: any, index: number) => (
                <div key={index} className="text-xs text-gray-400 ml-2">
                  {iface.family}: {iface.address}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;