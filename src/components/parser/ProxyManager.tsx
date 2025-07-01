import React, { useState } from 'react';
import { Server, Plus, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ProxyEntry {
  id: number;
  host: string;
  port: number;
  type: 'http' | 'https' | 'socks4' | 'socks5';
  username?: string;
  password?: string;
  country: string;
  city: string;
  speed: number;
  uptime: number;
  status: 'online' | 'offline' | 'checking';
  persistent: boolean;
  lastChecked: Date;
  responseTime: number;
  anonymityLevel: 'transparent' | 'anonymous' | 'elite';
}

const ProxyManager: React.FC = () => {
  const [proxies, setProxies] = useState<ProxyEntry[]>([
    {
      id: 1,
      host: '192.168.1.100',
      port: 8080,
      type: 'http',
      username: 'user1',
      password: 'pass123',
      country: 'Russia',
      city: 'Moscow',
      speed: 1024,
      uptime: 99.5,
      status: 'online',
      persistent: true,
      lastChecked: new Date(),
      responseTime: 150,
      anonymityLevel: 'elite'
    },
    {
      id: 2,
      host: '10.0.0.50',
      port: 1080,
      type: 'socks5',
      country: 'Germany',
      city: 'Berlin',
      speed: 2048,
      uptime: 95.2,
      status: 'offline',
      persistent: false,
      lastChecked: new Date(),
      responseTime: 0,
      anonymityLevel: 'anonymous'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newProxy, setNewProxy] = useState({
    host: '',
    port: 8080,
    type: 'http' as 'http' | 'https' | 'socks4' | 'socks5',
    username: '',
    password: '',
    country: '',
    city: '',
    persistent: false
  });

  const addProxy = () => {
    if (!newProxy.host.trim()) return;
    
    const proxy: ProxyEntry = {
      id: proxies.length + 1,
      ...newProxy,
      speed: 0,
      uptime: 0,
      status: 'checking',
      lastChecked: new Date(),
      responseTime: 0,
      anonymityLevel: 'transparent'
    };
    
    setProxies([...proxies, proxy]);
    setNewProxy({
      host: '',
      port: 8080,
      type: 'http',
      username: '',
      password: '',
      country: '',
      city: '',
      persistent: false
    });
    setShowForm(false);
  };

  const togglePersistent = (id: number) => {
    setProxies(proxies.map(proxy => 
      proxy.id === id ? { ...proxy, persistent: !proxy.persistent } : proxy
    ));
  };

  const deleteProxy = (id: number) => {
    setProxies(proxies.filter(proxy => proxy.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'offline': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'checking': return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      default: return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-900/20';
      case 'offline': return 'text-red-400 bg-red-900/20';
      case 'checking': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getAnonymityColor = (level: string) => {
    switch (level) {
      case 'elite': return 'text-green-400 bg-green-900/20';
      case 'anonymous': return 'text-yellow-400 bg-yellow-900/20';
      case 'transparent': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Server className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Менеджер прокси</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить прокси</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="IP адрес или хост"
              value={newProxy.host}
              onChange={(e) => setNewProxy({ ...newProxy, host: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Порт"
              value={newProxy.port}
              onChange={(e) => setNewProxy({ ...newProxy, port: parseInt(e.target.value) || 8080 })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            <select
              value={newProxy.type}
              onChange={(e) => setNewProxy({ ...newProxy, type: e.target.value as any })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            >
              <option value="http">HTTP</option>
              <option value="https">HTTPS</option>
              <option value="socks4">SOCKS4</option>
              <option value="socks5">SOCKS5</option>
            </select>
            <input
              type="text"
              placeholder="Страна"
              value={newProxy.country}
              onChange={(e) => setNewProxy({ ...newProxy, country: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Логин (опционально)"
              value={newProxy.username}
              onChange={(e) => setNewProxy({ ...newProxy, username: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Пароль (опционально)"
              value={newProxy.password}
              onChange={(e) => setNewProxy({ ...newProxy, password: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-3 mt-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newProxy.persistent}
                onChange={(e) => setNewProxy({ ...newProxy, persistent: e.target.checked })}
              />
              <span className="text-gray-300">Персистентный</span>
            </label>
            <button
              onClick={addProxy}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Добавить
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {proxies.map((proxy) => (
            <div
              key={proxy.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(proxy.status)}
                    <h4 className="text-white font-semibold">{proxy.host}:{proxy.port}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(proxy.status)}`}>
                      {proxy.status === 'online' ? 'Онлайн' :
                       proxy.status === 'offline' ? 'Офлайн' : 'Проверка'}
                    </span>
                    <span className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded">
                      {proxy.type.toUpperCase()}
                    </span>
                    {proxy.persistent && (
                      <span className="px-2 py-1 bg-cyan-900/20 text-cyan-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Местоположение:</span>
                      <p className="text-gray-300">{proxy.city}, {proxy.country}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Скорость:</span>
                      <p className="text-gray-300">{proxy.speed} KB/s</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Время отклика:</span>
                      <p className="text-gray-300">{proxy.responseTime}ms</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Аптайм:</span>
                      <p className="text-gray-300">{proxy.uptime}%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-3">
                    <span className={`px-2 py-1 rounded text-xs ${getAnonymityColor(proxy.anonymityLevel)}`}>
                      {proxy.anonymityLevel === 'elite' ? 'Элитный' :
                       proxy.anonymityLevel === 'anonymous' ? 'Анонимный' : 'Прозрачный'}
                    </span>
                    {proxy.username && (
                      <span className="text-xs text-gray-400">
                        Авторизация: {proxy.username}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      Проверен: {proxy.lastChecked.toLocaleString('ru-RU')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(proxy.id)}
                    className={`p-1 rounded ${proxy.persistent ? 'text-cyan-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <Server className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProxy(proxy.id)}
                    className="p-1 text-red-400 hover:text-red-300 hover:bg-gray-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProxyManager;