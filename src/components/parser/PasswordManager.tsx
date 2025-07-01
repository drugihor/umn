import React, { useState } from 'react';
import { Key, Plus, Trash2, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';

interface PasswordEntry {
  id: number;
  site: string;
  username: string;
  password: string;
  email?: string;
  url: string;
  strength: 'weak' | 'medium' | 'strong';
  category: string;
  notes: string;
  persistent: boolean;
  lastUsed: Date;
  created: Date;
  twoFactorEnabled: boolean;
  breached: boolean;
}

const PasswordManager: React.FC = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([
    {
      id: 1,
      site: 'Gmail',
      username: 'user@example.com',
      password: 'MyStr0ngP@ssw0rd!',
      email: 'user@example.com',
      url: 'https://gmail.com',
      strength: 'strong',
      category: 'Email',
      notes: 'Основная почта',
      persistent: true,
      lastUsed: new Date(),
      created: new Date('2024-01-15'),
      twoFactorEnabled: true,
      breached: false
    },
    {
      id: 2,
      site: 'Facebook',
      username: 'myusername',
      password: 'password123',
      url: 'https://facebook.com',
      strength: 'weak',
      category: 'Social',
      notes: '',
      persistent: false,
      lastUsed: new Date('2024-01-10'),
      created: new Date('2023-12-01'),
      twoFactorEnabled: false,
      breached: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{[key: number]: boolean}>({});
  const [newPassword, setNewPassword] = useState({
    site: '',
    username: '',
    password: '',
    email: '',
    url: '',
    category: 'Other',
    notes: '',
    persistent: false
  });

  const addPassword = () => {
    if (!newPassword.site.trim() || !newPassword.username.trim() || !newPassword.password.trim()) return;
    
    const entry: PasswordEntry = {
      id: passwords.length + 1,
      ...newPassword,
      strength: calculateStrength(newPassword.password),
      lastUsed: new Date(),
      created: new Date(),
      twoFactorEnabled: false,
      breached: false
    };
    
    setPasswords([...passwords, entry]);
    setNewPassword({
      site: '',
      username: '',
      password: '',
      email: '',
      url: '',
      category: 'Other',
      notes: '',
      persistent: false
    });
    setShowForm(false);
  };

  const calculateStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (password.length < 8) return 'weak';
    if (password.length < 12 && !/[A-Z]/.test(password) && !/[0-9]/.test(password)) return 'weak';
    if (password.length >= 12 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*]/.test(password)) return 'strong';
    return 'medium';
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePersistent = (id: number) => {
    setPasswords(passwords.map(pass => 
      pass.id === id ? { ...pass, persistent: !pass.persistent } : pass
    ));
  };

  const deletePassword = (id: number) => {
    setPasswords(passwords.filter(pass => pass.id !== id));
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-green-400 bg-green-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'weak': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const categories = ['Email', 'Social', 'Banking', 'Work', 'Shopping', 'Entertainment', 'Other'];

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Key className="w-5 h-5 text-red-400" />
            <h3 className="text-xl font-bold text-white">Менеджер паролей</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить пароль</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Название сайта"
              value={newPassword.site}
              onChange={(e) => setNewPassword({ ...newPassword, site: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Имя пользователя"
              value={newPassword.username}
              onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={newPassword.password}
              onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email (опционально)"
              value={newPassword.email}
              onChange={(e) => setNewPassword({ ...newPassword, email: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
            />
            <input
              type="url"
              placeholder="URL сайта"
              value={newPassword.url}
              onChange={(e) => setNewPassword({ ...newPassword, url: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
            />
            <select
              value={newPassword.category}
              onChange={(e) => setNewPassword({ ...newPassword, category: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Заметки"
            value={newPassword.notes}
            onChange={(e) => setNewPassword({ ...newPassword, notes: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-red-500 focus:outline-none h-20 resize-none mt-3"
          />
          <div className="flex items-center space-x-3 mt-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newPassword.persistent}
                onChange={(e) => setNewPassword({ ...newPassword, persistent: e.target.checked })}
              />
              <span className="text-gray-300">Персистентный</span>
            </label>
            <button
              onClick={addPassword}
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
          {passwords.map((pass) => (
            <div
              key={pass.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">{pass.site}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getStrengthColor(pass.strength)}`}>
                      {pass.strength === 'strong' ? 'Сильный' :
                       pass.strength === 'medium' ? 'Средний' : 'Слабый'}
                    </span>
                    <span className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded">
                      {pass.category}
                    </span>
                    {pass.persistent && (
                      <span className="px-2 py-1 bg-red-900/20 text-red-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                    {pass.twoFactorEnabled && (
                      <Shield className="w-4 h-4 text-green-400" title="2FA включен" />
                    )}
                    {pass.breached && (
                      <AlertTriangle className="w-4 h-4 text-red-400" title="Обнаружена утечка" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Пользователь:</span>
                      <p className="text-gray-300">{pass.username}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Пароль:</span>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-300 font-mono">
                          {showPasswords[pass.id] ? pass.password : '••••••••••••'}
                        </p>
                        <button
                          onClick={() => togglePasswordVisibility(pass.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {showPasswords[pass.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {pass.email && (
                      <div>
                        <span className="text-gray-400">Email:</span>
                        <p className="text-gray-300">{pass.email}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">URL:</span>
                      <a href={pass.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm break-all">
                        {pass.url}
                      </a>
                    </div>
                  </div>
                  
                  {pass.notes && (
                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Заметки:</span>
                      <p className="text-gray-300 text-sm">{pass.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                    <span>Создан: {pass.created.toLocaleDateString('ru-RU')}</span>
                    <span>Использован: {pass.lastUsed.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(pass.id)}
                    className={`p-1 rounded ${pass.persistent ? 'text-red-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <Key className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deletePassword(pass.id)}
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

export default PasswordManager;