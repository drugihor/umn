import React, { useState } from 'react';
import { Settings, Sliders, Brain, Mic, Volume2 } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    aiModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
    language: 'ru',
    voiceEnabled: true,
    autoSave: true,
    darkMode: true,
    notifications: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-gray-400" />
          <h2 className="text-xl font-bold text-white">Настройки</h2>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          
          {/* AI Model Settings */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">Настройки ИИ модели</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Модель ИИ
                </label>
                <select
                  value={settings.aiModel}
                  onChange={(e) => updateSetting('aiModel', e.target.value)}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                >
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="claude-3">Claude 3</option>
                  <option value="local-llama">Local Llama</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Температура: {settings.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.temperature}
                  onChange={(e) => updateSetting('temperature', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Консервативно</span>
                  <span>Креативно</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Максимум токенов
                </label>
                <input
                  type="number"
                  value={settings.maxTokens}
                  onChange={(e) => updateSetting('maxTokens', parseInt(e.target.value))}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
          
          {/* General Settings */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-2 mb-4">
              <Sliders className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-semibold">Общие настройки</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Язык интерфейса
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting('language', e.target.value)}
                  className="w-full bg-gray-600 text-white px-3 py-2 rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mic className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">Голосовое распознавание</span>
                </div>
                <button
                  onClick={() => updateSetting('voiceEnabled', !settings.voiceEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.voiceEnabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">Автосохранение</span>
                </div>
                <button
                  onClick={() => updateSetting('autoSave', !settings.autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoSave ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Уведомления</span>
                <button
                  onClick={() => updateSetting('notifications', !settings.notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Сохранить настройки
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;