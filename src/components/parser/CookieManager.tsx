import React, { useState } from 'react';
import { Cookie, Plus, Trash2, Shield, Clock, Eye, EyeOff } from 'lucide-react';

interface CookieEntry {
  id: number;
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: Date | null;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
  persistent: boolean;
  size: number;
  lastAccessed: Date;
}

const CookieManager: React.FC = () => {
  const [cookies, setCookies] = useState<CookieEntry[]>([
    {
      id: 1,
      name: 'session_id',
      value: 'abc123def456ghi789',
      domain: '.example.com',
      path: '/',
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      persistent: true,
      size: 18,
      lastAccessed: new Date()
    },
    {
      id: 2,
      name: 'user_preferences',
      value: '{"theme":"dark","lang":"ru"}',
      domain: 'app.example.com',
      path: '/dashboard',
      expires: null,
      httpOnly: false,
      secure: false,
      sameSite: 'Strict',
      persistent: false,
      size: 26,
      lastAccessed: new Date()
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newCookie, setNewCookie] = useState({
    name: '',
    value: '',
    domain: '',
    path: '/',
    httpOnly: false,
    secure: false,
    sameSite: 'Lax' as 'Strict' | 'Lax' | 'None',
    persistent: false
  });

  const addCookie = () => {
    if (!newCookie.name.trim() || !newCookie.domain.trim()) return;
    
    const cookie: CookieEntry = {
      id: cookies.length + 1,
      ...newCookie,
      expires: null,
      size: newCookie.value.length,
      lastAccessed: new Date()
    };
    
    setCookies([...cookies, cookie]);
    setNewCookie({
      name: '',
      value: '',
      domain: '',
      path: '/',
      httpOnly: false,
      secure: false,
      sameSite: 'Lax',
      persistent: false
    });
    setShowForm(false);
  };

  const togglePersistent = (id: number) => {
    setCookies(cookies.map(cookie => 
      cookie.id === id ? { ...cookie, persistent: !cookie.persistent } : cookie
    ));
  };

  const deleteCookie = (id: number) => {
    setCookies(cookies.filter(cookie => cookie.id !== id));
  };

  const formatExpires = (expires: Date | null) => {
    if (!expires) return 'Session';
    return expires.toLocaleDateString('ru-RU');
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Cookie className="w-5 h-5 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Cookie Менеджер</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить Cookie</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Имя cookie"
              value={newCookie.name}
              onChange={(e) => setNewCookie({ ...newCookie, name: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Значение"
              value={newCookie.value}
              onChange={(e) => setNewCookie({ ...newCookie, value: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Домен (например: .example.com)"
              value={newCookie.domain}
              onChange={(e) => setNewCookie({ ...newCookie, domain: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Путь"
              value={newCookie.path}
              onChange={(e) => setNewCookie({ ...newCookie, path: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
            <select
              value={newCookie.sameSite}
              onChange={(e) => setNewCookie({ ...newCookie, sameSite: e.target.value as any })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
            >
              <option value="Strict">Strict</option>
              <option value="Lax">Lax</option>
              <option value="None">None</option>
            </select>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCookie.httpOnly}
                  onChange={(e) => setNewCookie({ ...newCookie, httpOnly: e.target.checked })}
                />
                <span className="text-gray-300 text-sm">HttpOnly</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCookie.secure}
                  onChange={(e) => setNewCookie({ ...newCookie, secure: e.target.checked })}
                />
                <span className="text-gray-300 text-sm">Secure</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCookie.persistent}
                  onChange={(e) => setNewCookie({ ...newCookie, persistent: e.target.checked })}
                />
                <span className="text-gray-300 text-sm">Персистентный</span>
              </label>
            </div>
          </div>
          <div className="flex space-x-3 mt-3">
            <button
              onClick={addCookie}
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
          {cookies.map((cookie) => (
            <div
              key={cookie.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">{cookie.name}</h4>
                    <span className="text-gray-400 text-xs">{cookie.size} bytes</span>
                    {cookie.persistent && (
                      <span className="px-2 py-1 bg-orange-900/20 text-orange-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Значение:</span>
                      <p className="text-gray-300 break-all">{cookie.value}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Домен:</span>
                      <p className="text-gray-300">{cookie.domain}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Путь:</span>
                      <p className="text-gray-300">{cookie.path}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Истекает:</span>
                      <p className="text-gray-300">{formatExpires(cookie.expires)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-3">
                    {cookie.httpOnly && (
                      <span className="flex items-center space-x-1 text-xs text-blue-400">
                        <Shield className="w-3 h-3" />
                        <span>HttpOnly</span>
                      </span>
                    )}
                    {cookie.secure && (
                      <span className="flex items-center space-x-1 text-xs text-green-400">
                        <Shield className="w-3 h-3" />
                        <span>Secure</span>
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      SameSite: {cookie.sameSite}
                    </span>
                    <span className="text-xs text-gray-400">
                      Доступ: {cookie.lastAccessed.toLocaleString('ru-RU')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(cookie.id)}
                    className={`p-1 rounded ${cookie.persistent ? 'text-orange-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    {cookie.persistent ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteCookie(cookie.id)}
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

export default CookieManager;