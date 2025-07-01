import React, { useState } from 'react';
import { Settings, Save, RotateCcw, Shield, Clock, Database, Network } from 'lucide-react';

const ParserSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    // General Settings
    maxConcurrentRequests: 10,
    requestTimeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
    
    // Persistence Settings
    autoPersist: true,
    persistenceThreshold: 100,
    cleanupInterval: 24,
    maxStorageSize: 1000,
    
    // Security Settings
    useProxyRotation: true,
    respectRobotsTxt: false,
    randomizeUserAgent: true,
    enableCookieJar: true,
    
    // Rate Limiting
    requestsPerSecond: 5,
    requestsPerMinute: 300,
    requestsPerHour: 10000,
    
    // Data Processing
    enableDataValidation: true,
    autoCleanDuplicates: true,
    enableDataEncryption: false,
    compressionLevel: 6,
    
    // Monitoring
    enableLogging: true,
    logLevel: 'info',
    enableMetrics: true,
    alertOnErrors: true,
    
    // Export Settings
    exportFormat: 'json',
    includeMetadata: true,
    enableBackups: true,
    backupInterval: 6
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    // Reset to default values
    setSettings({
      maxConcurrentRequests: 10,
      requestTimeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      autoPersist: true,
      persistenceThreshold: 100,
      cleanupInterval: 24,
      maxStorageSize: 1000,
      useProxyRotation: true,
      respectRobotsTxt: false,
      randomizeUserAgent: true,
      enableCookieJar: true,
      requestsPerSecond: 5,
      requestsPerMinute: 300,
      requestsPerHour: 10000,
      enableDataValidation: true,
      autoCleanDuplicates: true,
      enableDataEncryption: false,
      compressionLevel: 6,
      enableLogging: true,
      logLevel: 'info',
      enableMetrics: true,
      alertOnErrors: true,
      exportFormat: 'json',
      includeMetadata: true,
      enableBackups: true,
      backupInterval: 6
    });
  };

  const saveSettings = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
    alert('Настройки сохранены!');
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-gray-400" />
            <h3 className="text-xl font-bold text-white">Настройки парсера</h3>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={resetSettings}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Сброс</span>
            </button>
            <button
              onClick={saveSettings}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Сохранить</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          
          {/* General Settings */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-semibold">Общие настройки</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Максимум одновременных запросов
                </label>
                <input
                  type="number"
                  value={settings.maxConcurrentRequests}
                  onChange={(e) => updateSetting('maxConcurrentRequests', parseInt(e.target.value))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Таймаут запроса (мс)
                </label>
                <input
                  type="number"
                  value={settings.requestTimeout}
                  onChange={(e) => updateSetting('requestTimeout', parseInt(e.target.value))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Попытки повтора
                </label>
                <input
                  type="number"
                  value={settings.retryAttempts}
                  onChange={(e) => updateSetting('retryAttempts', parseInt(e.target.value))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Задержка повтора (мс)
                </label>
                <input
                  type="number"
                  value={settings.retryDelay}
                  onChange={(e) => updateSetting('retryDelay', parseInt(e.target.value))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Persistence Settings */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-4">
              <Database className="w-5 h-5 text-green-400" />
              <h4 className="text-white font-semibold">Настройки персистентности</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Автоматическая персистентность</span>
                <button
                  onClick={() => updateSetting('autoPersist', !settings.autoPersist)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoPersist ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoPersist ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Порог персистентности
                  </label>
                  <input
                    type="number"
                    value={settings.persistenceThreshold}
                    onChange={(e) => updateSetting('persistenceThreshold', parseInt(e.target.value))}
                    className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-green-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Интервал очистки (часы)
                  </label>
                  <input
                    type="number"
                    value={settings.cleanupInterval}
                    onChange={(e) => updateSetting('cleanupInterval', parseInt(e.target.value))}
                    className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-red-400" />
              <h4 className="text-white font-semibold">Настройки безопасности</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Ротация прокси</span>
                <button
                  onClick={() => updateSetting('useProxyRotation', !settings.useProxyRotation)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.useProxyRotation ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.useProxyRotation ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Соблюдать robots.txt</span>
                <button
                  onClick={() => updateSetting('respectRobotsTxt', !settings.respectRobotsTxt)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.respectRobotsTxt ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.respectRobotsTxt ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Рандомизация User-Agent</span>
                <button
                  onClick={() => updateSetting('randomizeUserAgent', !settings.randomizeUserAgent)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.randomizeUserAgent ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.randomizeUserAgent ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Включить Cookie Jar</span>
                <button
                  onClick={() => updateSetting('enableCookieJar', !settings.enableCookieJar)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enableCookieJar ? 'bg-red-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enableCookieJar ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Rate Limiting */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-yellow-400" />
              <h4 className="text-white font-semibold">Ограничение скорости</h4>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Запросов в секунду
                </label>
                <input
                  type="number"
                  value={settings.requestsPerSecond}
                  onChange={(e) => updateSetting('requestsPerSecond', parseInt(e.target.value))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Запросов в минуту
                </label>
                <input
                  type="number"
                  value={settings.requestsPerMinute}
                  onChange={(e) => updateSetting('requestsPerMinute', parseInt(e.target.value))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Запросов в час
                </label>
                <input
                  type="number"
                  value={settings.requestsPerHour}
                  onChange={(e) => updateSetting('requestsPerHour', parseInt(e.target.value))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-yellow-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Data Processing */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-4">
              <Database className="w-5 h-5 text-purple-400" />
              <h4 className="text-white font-semibold">Обработка данных</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Валидация данных</span>
                <button
                  onClick={() => updateSetting('enableDataValidation', !settings.enableDataValidation)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enableDataValidation ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enableDataValidation ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Автоочистка дубликатов</span>
                <button
                  onClick={() => updateSetting('autoCleanDuplicates', !settings.autoCleanDuplicates)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoCleanDuplicates ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoCleanDuplicates ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Шифрование данных</span>
                <button
                  onClick={() => updateSetting('enableDataEncryption', !settings.enableDataEncryption)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enableDataEncryption ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enableDataEncryption ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Уровень сжатия: {settings.compressionLevel}
                </label>
                <input
                  type="range"
                  min="0"
                  max="9"
                  value={settings.compressionLevel}
                  onChange={(e) => updateSetting('compressionLevel', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Export Settings */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-4">
              <Network className="w-5 h-5 text-cyan-400" />
              <h4 className="text-white font-semibold">Настройки экспорта</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Формат экспорта
                </label>
                <select
                  value={settings.exportFormat}
                  onChange={(e) => updateSetting('exportFormat', e.target.value)}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                  <option value="xlsx">Excel</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Включать метаданные</span>
                <button
                  onClick={() => updateSetting('includeMetadata', !settings.includeMetadata)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.includeMetadata ? 'bg-cyan-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.includeMetadata ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Автоматические резервные копии</span>
                <button
                  onClick={() => updateSetting('enableBackups', !settings.enableBackups)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enableBackups ? 'bg-cyan-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enableBackups ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParserSettings;