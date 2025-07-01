import React, { useState } from 'react';
import { User, Plus, Trash2, Eye, EyeOff, Shield, AlertTriangle, Star } from 'lucide-react';

interface AccountEntry {
  id: number;
  platform: string;
  username: string;
  email: string;
  password: string;
  displayName?: string;
  profileUrl?: string;
  followers?: number;
  following?: number;
  posts?: number;
  verified: boolean;
  status: 'active' | 'suspended' | 'banned' | 'deactivated';
  persistent: boolean;
  lastLogin: Date;
  created: Date;
  category: string;
  notes: string;
  twoFactorEnabled: boolean;
  phoneNumber?: string;
  recoveryEmail?: string;
  subscriptions?: string[];
  premium: boolean;
}

const AccountManager: React.FC = () => {
  const [accounts, setAccounts] = useState<AccountEntry[]>([
    {
      id: 1,
      platform: 'Instagram',
      username: 'myusername',
      email: 'user@example.com',
      password: 'MyStr0ngP@ss!',
      displayName: 'Иван Петров',
      profileUrl: 'https://instagram.com/myusername',
      followers: 1250,
      following: 890,
      posts: 156,
      verified: false,
      status: 'active',
      persistent: true,
      lastLogin: new Date(),
      created: new Date('2023-01-15'),
      category: 'Social',
      notes: 'Личный аккаунт',
      twoFactorEnabled: true,
      phoneNumber: '+7 (999) 123-45-67',
      recoveryEmail: 'backup@example.com',
      premium: false
    },
    {
      id: 2,
      platform: 'YouTube',
      username: 'mychannel',
      email: 'creator@example.com',
      password: 'AnotherP@ss123',
      displayName: 'My Channel',
      profileUrl: 'https://youtube.com/@mychannel',
      followers: 5600,
      posts: 45,
      verified: true,
      status: 'active',
      persistent: false,
      lastLogin: new Date('2024-01-10'),
      created: new Date('2022-06-01'),
      category: 'Content',
      notes: 'Канал для видео',
      twoFactorEnabled: false,
      subscriptions: ['YouTube Premium', 'YouTube Music'],
      premium: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{[key: number]: boolean}>({});
  const [newAccount, setNewAccount] = useState({
    platform: '',
    username: '',
    email: '',
    password: '',
    displayName: '',
    profileUrl: '',
    category: 'Social',
    notes: '',
    phoneNumber: '',
    recoveryEmail: '',
    persistent: false
  });

  const addAccount = () => {
    if (!newAccount.platform.trim() || !newAccount.username.trim() || !newAccount.email.trim()) return;
    
    const account: AccountEntry = {
      id: accounts.length + 1,
      ...newAccount,
      verified: false,
      status: 'active',
      lastLogin: new Date(),
      created: new Date(),
      twoFactorEnabled: false,
      premium: false
    };
    
    setAccounts([...accounts, account]);
    setNewAccount({
      platform: '',
      username: '',
      email: '',
      password: '',
      displayName: '',
      profileUrl: '',
      category: 'Social',
      notes: '',
      phoneNumber: '',
      recoveryEmail: '',
      persistent: false
    });
    setShowForm(false);
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePersistent = (id: number) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, persistent: !account.persistent } : account
    ));
  };

  const deleteAccount = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20';
      case 'suspended': return 'text-yellow-400 bg-yellow-900/20';
      case 'banned': return 'text-red-400 bg-red-900/20';
      case 'deactivated': return 'text-gray-400 bg-gray-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const platforms = ['Instagram', 'Facebook', 'Twitter', 'YouTube', 'TikTok', 'LinkedIn', 'Discord', 'Telegram', 'VK', 'Other'];
  const categories = ['Social', 'Content', 'Professional', 'Gaming', 'Shopping', 'Entertainment', 'Other'];

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-violet-400" />
            <h3 className="text-xl font-bold text-white">Менеджер аккаунтов</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить аккаунт</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={newAccount.platform}
              onChange={(e) => setNewAccount({ ...newAccount, platform: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none"
            >
              <option value="">Выберите платформу</option>
              {platforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Имя пользователя"
              value={newAccount.username}
              onChange={(e) => setNewAccount({ ...newAccount, username: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={newAccount.email}
              onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={newAccount.password}
              onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Отображаемое имя"
              value={newAccount.displayName}
              onChange={(e) => setNewAccount({ ...newAccount, displayName: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none"
            />
            <input
              type="url"
              placeholder="URL профиля"
              value={newAccount.profileUrl}
              onChange={(e) => setNewAccount({ ...newAccount, profileUrl: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none"
            />
            <select
              value={newAccount.category}
              onChange={(e) => setNewAccount({ ...newAccount, category: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="Номер телефона"
              value={newAccount.phoneNumber}
              onChange={(e) => setNewAccount({ ...newAccount, phoneNumber: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none"
            />
          </div>
          <input
            type="email"
            placeholder="Резервный email"
            value={newAccount.recoveryEmail}
            onChange={(e) => setNewAccount({ ...newAccount, recoveryEmail: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none mt-3"
          />
          <textarea
            placeholder="Заметки"
            value={newAccount.notes}
            onChange={(e) => setNewAccount({ ...newAccount, notes: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-violet-500 focus:outline-none h-20 resize-none mt-3"
          />
          <div className="flex items-center space-x-3 mt-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newAccount.persistent}
                onChange={(e) => setNewAccount({ ...newAccount, persistent: e.target.checked })}
              />
              <span className="text-gray-300">Персистентный</span>
            </label>
            <button
              onClick={addAccount}
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
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">{account.platform}</h4>
                    <span className="text-gray-300">@{account.username}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(account.status)}`}>
                      {account.status === 'active' ? 'Активен' :
                       account.status === 'suspended' ? 'Приостановлен' :
                       account.status === 'banned' ? 'Заблокирован' : 'Деактивирован'}
                    </span>
                    <span className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded">
                      {account.category}
                    </span>
                    {account.verified && (
                      <Shield className="w-4 h-4 text-blue-400" title="Верифицирован" />
                    )}
                    {account.premium && (
                      <Star className="w-4 h-4 text-yellow-400" title="Премиум" />
                    )}
                    {account.persistent && (
                      <span className="px-2 py-1 bg-violet-900/20 text-violet-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                    {account.twoFactorEnabled && (
                      <Shield className="w-4 h-4 text-green-400" title="2FA включен" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Email:</span>
                      <p className="text-gray-300">{account.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Пароль:</span>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-300 font-mono">
                          {showPasswords[account.id] ? account.password : '••••••••••••'}
                        </p>
                        <button
                          onClick={() => togglePasswordVisibility(account.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {showPasswords[account.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    {account.displayName && (
                      <div>
                        <span className="text-gray-400">Отображаемое имя:</span>
                        <p className="text-gray-300">{account.displayName}</p>
                      </div>
                    )}
                    {account.profileUrl && (
                      <div>
                        <span className="text-gray-400">Профиль:</span>
                        <a href={account.profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm break-all">
                          {account.profileUrl}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {(account.followers !== undefined || account.following !== undefined || account.posts !== undefined) && (
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      {account.followers !== undefined && (
                        <span className="text-gray-400">
                          Подписчики: <span className="text-white">{account.followers.toLocaleString()}</span>
                        </span>
                      )}
                      {account.following !== undefined && (
                        <span className="text-gray-400">
                          Подписки: <span className="text-white">{account.following.toLocaleString()}</span>
                        </span>
                      )}
                      {account.posts !== undefined && (
                        <span className="text-gray-400">
                          Посты: <span className="text-white">{account.posts.toLocaleString()}</span>
                        </span>
                      )}
                    </div>
                  )}
                  
                  {account.subscriptions && account.subscriptions.length > 0 && (
                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Подписки:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {account.subscriptions.map((sub, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {account.notes && (
                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Заметки:</span>
                      <p className="text-gray-300 text-sm">{account.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                    <span>Создан: {account.created.toLocaleDateString('ru-RU')}</span>
                    <span>Вход: {account.lastLogin.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(account.id)}
                    className={`p-1 rounded ${account.persistent ? 'text-violet-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <User className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteAccount(account.id)}
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

export default AccountManager;