import React, { useState } from 'react';
import { Search, Settings, Database, Shield, Globe, Key, Mail, CreditCard, Gift, User, Server, Dns, Eye, Cookie, FileText, Download, Upload, Play, Pause, RotateCcw } from 'lucide-react';
import URLManager from './parser/URLManager';
import CookieManager from './parser/CookieManager';
import CertificateManager from './parser/CertificateManager';
import FingerprintManager from './parser/FingerprintManager';
import ProxyManager from './parser/ProxyManager';
import DNSManager from './parser/DNSManager';
import PasswordManager from './parser/PasswordManager';
import LogManager from './parser/LogManager';
import EmailManager from './parser/EmailManager';
import CardManager from './parser/CardManager';
import GiftCardManager from './parser/GiftCardManager';
import AccountManager from './parser/AccountManager';
import ParserSettings from './parser/ParserSettings';

const ParserPanel: React.FC = () => {
  const [activeManager, setActiveManager] = useState('urls');
  const [isRunning, setParsing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    totalParsed: 0,
    successRate: 0,
    errors: 0,
    persistent: 0
  });

  const managers = [
    { id: 'urls', icon: Globe, label: 'URL Менеджер', color: 'text-blue-400', count: 1247 },
    { id: 'cookies', icon: Cookie, label: 'Cookie Менеджер', color: 'text-orange-400', count: 892 },
    { id: 'certificates', icon: Shield, label: 'Сертификаты', color: 'text-green-400', count: 156 },
    { id: 'fingerprints', icon: Eye, label: 'Отпечатки', color: 'text-purple-400', count: 324 },
    { id: 'proxies', icon: Server, label: 'Прокси', color: 'text-cyan-400', count: 78 },
    { id: 'dns', icon: Dns, label: 'DNS', color: 'text-indigo-400', count: 234 },
    { id: 'passwords', icon: Key, label: 'Пароли', color: 'text-red-400', count: 567 },
    { id: 'logs', icon: FileText, label: 'Логи', color: 'text-gray-400', count: 2341 },
    { id: 'emails', icon: Mail, label: 'Email', color: 'text-yellow-400', count: 445 },
    { id: 'cards', icon: CreditCard, label: 'Карты', color: 'text-pink-400', count: 89 },
    { id: 'giftcards', icon: Gift, label: 'Подарочные карты', color: 'text-emerald-400', count: 123 },
    { id: 'accounts', icon: User, label: 'Аккаунты', color: 'text-violet-400', count: 678 },
    { id: 'settings', icon: Settings, label: 'Настройки', color: 'text-gray-400', count: 0 }
  ];

  const startParsing = () => {
    setParsing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setParsing(false);
          setStats(prev => ({
            ...prev,
            totalParsed: prev.totalParsed + Math.floor(Math.random() * 100),
            successRate: 85 + Math.random() * 10,
            errors: Math.floor(Math.random() * 5),
            persistent: prev.persistent + Math.floor(Math.random() * 20)
          }));
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 200);
  };

  const renderActiveManager = () => {
    switch (activeManager) {
      case 'urls': return <URLManager />;
      case 'cookies': return <CookieManager />;
      case 'certificates': return <CertificateManager />;
      case 'fingerprints': return <FingerprintManager />;
      case 'proxies': return <ProxyManager />;
      case 'dns': return <DNSManager />;
      case 'passwords': return <PasswordManager />;
      case 'logs': return <LogManager />;
      case 'emails': return <EmailManager />;
      case 'cards': return <CardManager />;
      case 'giftcards': return <GiftCardManager />;
      case 'accounts': return <AccountManager />;
      case 'settings': return <ParserSettings />;
      default: return <URLManager />;
    }
  };

  return (
    <div className="flex h-full bg-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Search className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Парсер</h2>
          </div>
          <p className="text-gray-400 text-sm mt-1">Система сбора данных</p>
        </div>

        {/* Parser Controls */}
        <div className="p-4 border-b border-gray-700">
          <div className="space-y-3">
            <button
              onClick={startParsing}
              disabled={isRunning}
              className={`w-full px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                isRunning 
                  ? 'bg-yellow-600 hover:bg-yellow-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white disabled:opacity-50`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Остановить' : 'Запустить'}</span>
            </button>
            
            {isRunning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Прогресс:</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-white font-semibold mb-3">Статистика</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Обработано:</span>
              <span className="text-white">{stats.totalParsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Успешность:</span>
              <span className="text-green-400">{stats.successRate.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Ошибки:</span>
              <span className="text-red-400">{stats.errors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Персистентные:</span>
              <span className="text-blue-400">{stats.persistent}</span>
            </div>
          </div>
        </div>

        {/* Managers List */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2">
            {managers.map((manager) => {
              const IconComponent = manager.icon;
              return (
                <button
                  key={manager.id}
                  onClick={() => setActiveManager(manager.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 mb-1 ${
                    activeManager === manager.id
                      ? 'bg-gray-800 text-white border-l-4 border-blue-500'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-4 h-4 ${manager.color}`} />
                    <span className="font-medium text-sm">{manager.label}</span>
                  </div>
                  {manager.count > 0 && (
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      {manager.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-700">
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 flex items-center justify-center">
              <Upload className="w-4 h-4 text-gray-300" />
            </button>
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 flex items-center justify-center">
              <Download className="w-4 h-4 text-gray-300" />
            </button>
            <button className="p-2 bg-gray-700 rounded hover:bg-gray-600 flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {renderActiveManager()}
      </div>
    </div>
  );
};

export default ParserPanel;