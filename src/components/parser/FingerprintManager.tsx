import React, { useState } from 'react';
import { Eye, Plus, Trash2, Monitor, Smartphone, Globe } from 'lucide-react';

interface FingerprintEntry {
  id: number;
  userAgent: string;
  platform: string;
  language: string;
  timezone: string;
  screenResolution: string;
  colorDepth: number;
  cookiesEnabled: boolean;
  javaEnabled: boolean;
  plugins: string[];
  fonts: string[];
  canvas: string;
  webgl: string;
  audioContext: string;
  deviceMemory: number;
  hardwareConcurrency: number;
  persistent: boolean;
  lastSeen: Date;
  fingerprint: string;
}

const FingerprintManager: React.FC = () => {
  const [fingerprints, setFingerprints] = useState<FingerprintEntry[]>([
    {
      id: 1,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      platform: 'Win32',
      language: 'ru-RU',
      timezone: 'Europe/Moscow',
      screenResolution: '1920x1080',
      colorDepth: 24,
      cookiesEnabled: true,
      javaEnabled: false,
      plugins: ['Chrome PDF Plugin', 'Native Client'],
      fonts: ['Arial', 'Times New Roman', 'Helvetica'],
      canvas: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
      webgl: 'ANGLE (Intel, Intel(R) HD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)',
      audioContext: '44100:128:2',
      deviceMemory: 8,
      hardwareConcurrency: 4,
      persistent: true,
      lastSeen: new Date(),
      fingerprint: 'fp_a1b2c3d4e5f6'
    },
    {
      id: 2,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)',
      platform: 'iPhone',
      language: 'en-US',
      timezone: 'America/New_York',
      screenResolution: '375x812',
      colorDepth: 32,
      cookiesEnabled: true,
      javaEnabled: false,
      plugins: [],
      fonts: ['Helvetica Neue', 'Arial'],
      canvas: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgBB...',
      webgl: 'Apple GPU',
      audioContext: '48000:256:2',
      deviceMemory: 4,
      hardwareConcurrency: 6,
      persistent: false,
      lastSeen: new Date(),
      fingerprint: 'fp_z9y8x7w6v5u4'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newFingerprint, setNewFingerprint] = useState({
    userAgent: '',
    platform: '',
    language: 'ru-RU',
    timezone: 'Europe/Moscow',
    screenResolution: '1920x1080',
    persistent: false
  });

  const addFingerprint = () => {
    if (!newFingerprint.userAgent.trim()) return;
    
    const fingerprint: FingerprintEntry = {
      id: fingerprints.length + 1,
      ...newFingerprint,
      colorDepth: 24,
      cookiesEnabled: true,
      javaEnabled: false,
      plugins: [],
      fonts: [],
      canvas: 'Generated...',
      webgl: 'Unknown',
      audioContext: '44100:128:2',
      deviceMemory: 8,
      hardwareConcurrency: 4,
      lastSeen: new Date(),
      fingerprint: `fp_${Math.random().toString(36).substr(2, 12)}`
    };
    
    setFingerprints([...fingerprints, fingerprint]);
    setNewFingerprint({
      userAgent: '',
      platform: '',
      language: 'ru-RU',
      timezone: 'Europe/Moscow',
      screenResolution: '1920x1080',
      persistent: false
    });
    setShowForm(false);
  };

  const togglePersistent = (id: number) => {
    setFingerprints(fingerprints.map(fp => 
      fp.id === id ? { ...fp, persistent: !fp.persistent } : fp
    ));
  };

  const deleteFingerprint = (id: number) => {
    setFingerprints(fingerprints.filter(fp => fp.id !== id));
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.includes('iPhone') || platform.includes('iPad')) {
      return <Smartphone className="w-4 h-4 text-blue-400" />;
    } else if (platform.includes('Android')) {
      return <Smartphone className="w-4 h-4 text-green-400" />;
    } else {
      return <Monitor className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Менеджер отпечатков</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить отпечаток</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="space-y-3">
            <textarea
              placeholder="User Agent"
              value={newFingerprint.userAgent}
              onChange={(e) => setNewFingerprint({ ...newFingerprint, userAgent: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none h-20 resize-none"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Платформа"
                value={newFingerprint.platform}
                onChange={(e) => setNewFingerprint({ ...newFingerprint, platform: e.target.value })}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
              <select
                value={newFingerprint.language}
                onChange={(e) => setNewFingerprint({ ...newFingerprint, language: e.target.value })}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="ru-RU">Русский (Россия)</option>
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="de-DE">Deutsch</option>
                <option value="fr-FR">Français</option>
              </select>
              <select
                value={newFingerprint.timezone}
                onChange={(e) => setNewFingerprint({ ...newFingerprint, timezone: e.target.value })}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="Europe/Moscow">Europe/Moscow</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
              <select
                value={newFingerprint.screenResolution}
                onChange={(e) => setNewFingerprint({ ...newFingerprint, screenResolution: e.target.value })}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
              >
                <option value="1920x1080">1920x1080</option>
                <option value="1366x768">1366x768</option>
                <option value="1440x900">1440x900</option>
                <option value="375x812">375x812 (iPhone)</option>
                <option value="414x896">414x896 (iPhone)</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newFingerprint.persistent}
                  onChange={(e) => setNewFingerprint({ ...newFingerprint, persistent: e.target.checked })}
                />
                <span className="text-gray-300">Персистентный</span>
              </label>
              <button
                onClick={addFingerprint}
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
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {fingerprints.map((fp) => (
            <div
              key={fp.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getPlatformIcon(fp.platform)}
                    <h4 className="text-white font-semibold">{fp.fingerprint}</h4>
                    {fp.persistent && (
                      <span className="px-2 py-1 bg-purple-900/20 text-purple-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">Платформа:</span>
                      <p className="text-gray-300">{fp.platform}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Язык:</span>
                      <p className="text-gray-300">{fp.language}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Часовой пояс:</span>
                      <p className="text-gray-300">{fp.timezone}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Разрешение:</span>
                      <p className="text-gray-300">{fp.screenResolution}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Память устройства:</span>
                      <p className="text-gray-300">{fp.deviceMemory} GB</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Ядра процессора:</span>
                      <p className="text-gray-300">{fp.hardwareConcurrency}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-gray-400 text-sm">User Agent:</span>
                    <p className="text-gray-300 text-xs break-all">{fp.userAgent}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-400">WebGL:</span>
                      <p className="text-gray-300 text-xs">{fp.webgl}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Audio Context:</span>
                      <p className="text-gray-300 text-xs">{fp.audioContext}</p>
                    </div>
                  </div>
                  
                  {fp.plugins.length > 0 && (
                    <div className="mb-3">
                      <span className="text-gray-400 text-sm">Плагины:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {fp.plugins.map((plugin, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                          >
                            {plugin}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-400">
                    Последний раз: {fp.lastSeen.toLocaleString('ru-RU')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(fp.id)}
                    className={`p-1 rounded ${fp.persistent ? 'text-purple-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteFingerprint(fp.id)}
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

export default FingerprintManager;