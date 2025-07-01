import React, { useState } from 'react';
import { Mail, Plus, Trash2, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';

interface EmailEntry {
  id: number;
  email: string;
  password?: string;
  provider: string;
  firstName?: string;
  lastName?: string;
  recoveryEmail?: string;
  phone?: string;
  birthDate?: Date;
  status: 'active' | 'suspended' | 'verified' | 'unverified';
  persistent: boolean;
  lastLogin: Date;
  created: Date;
  twoFactorEnabled: boolean;
  breached: boolean;
  category: string;
  notes: string;
}

const EmailManager: React.FC = () => {
  const [emails, setEmails] = useState<EmailEntry[]>([
    {
      id: 1,
      email: 'user@gmail.com',
      password: 'MyStr0ngP@ss!',
      provider: 'Gmail',
      firstName: 'Иван',
      lastName: 'Петров',
      recoveryEmail: 'backup@example.com',
      phone: '+7 (999) 123-45-67',
      birthDate: new Date('1990-05-15'),
      status: 'verified',
      persistent: true,
      lastLogin: new Date(),
      created: new Date('2023-01-15'),
      twoFactorEnabled: true,
      breached: false,
      category: 'Personal',
      notes: 'Основная почта'
    },
    {
      id: 2,
      email: 'work@company.com',
      provider: 'Outlook',
      status: 'active',
      persistent: false,
      lastLogin: new Date('2024-01-10'),
      created: new Date('2023-06-01'),
      twoFactorEnabled: false,
      breached: false,
      category: 'Work',
      notes: 'Рабочая почта'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{[key: number]: boolean}>({});
  const [newEmail, setNewEmail] = useState({
    email: '',
    password: '',
    provider: 'Gmail',
    firstName: '',
    lastName: '',
    recoveryEmail: '',
    phone: '',
    category: 'Personal',
    notes: '',
    persistent: false
  });

  const addEmail = () => {
    if (!newEmail.email.trim()) return;
    
    const entry: EmailEntry = {
      id: emails.length + 1,
      ...newEmail,
      birthDate: undefined,
      status: 'unverified',
      lastLogin: new Date(),
      created: new Date(),
      twoFactorEnabled: false,
      breached: false
    };
    
    setEmails([...emails, entry]);
    setNewEmail({
      email: '',
      password: '',
      provider: 'Gmail',
      firstName: '',
      lastName: '',
      recoveryEmail: '',
      phone: '',
      category: 'Personal',
      notes: '',
      persistent: false
    });
    setShowForm(false);
  };

  const togglePasswordVisibility = (id: number) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePersistent = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, persistent: !email.persistent } : email
    ));
  };

  const deleteEmail = (id: number) => {
    setEmails(emails.filter(email => email.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-900/20';
      case 'active': return 'text-blue-400 bg-blue-900/20';
      case 'suspended': return 'text-red-400 bg-red-900/20';
      case 'unverified': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const providers = ['Gmail', 'Outlook', 'Yahoo', 'Yandex', 'Mail.ru', 'Other'];
  const categories = ['Personal', 'Work', 'Shopping', 'Social', 'Temporary', 'Other'];

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Email Менеджер</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить email</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="email"
              placeholder="Email адрес"
              value={newEmail.email}
              onChange={(e) => setNewEmail({ ...newEmail, email: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Пароль (опционально)"
              value={newEmail.password}
              onChange={(e) => setNewEmail({ ...newEmail, password: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
            <select
              value={newEmail.provider}
              onChange={(e) => setNewEmail({ ...newEmail, provider: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            >
              {providers.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
            <select
              value={newEmail.category}
              onChange={(e) => setNewEmail({ ...newEmail, category: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Имя"
              value={newEmail.firstName}
              onChange={(e) => setNewEmail({ ...newEmail, firstName: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Фамилия"
              value={newEmail.lastName}
              onChange={(e) => setNewEmail({ ...newEmail, lastName: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Резервный email"
              value={newEmail.recoveryEmail}
              onChange={(e) => setNewEmail({ ...newEmail, recoveryEmail: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={newEmail.phone}
              onChange={(e) => setNewEmail({ ...newEmail, phone: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <textarea
            placeholder="Заметки"
            value={newEmail.notes}
            onChange={(e) => setNewEmail({ ...newEmail, notes: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none h-20 resize-none mt-3"
          />
          <div className="flex items-center space-x-3 mt-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newEmail.persistent}
                onChange={(e) => setNewEmail({ ...newEmail, persistent: e.target.checked })}
              />
              <span className="text-gray-300">Персистентный</span>
            </label>
            <button
              onClick={addEmail}
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
          {emails.map((email) => (
            <div
              key={email.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-semibold">{email.email}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(email.status)}`}>
                      {email.status === 'verified' ? 'Подтвержден' :
                       email.status === 'active' ? 'Активен' :
                       email.status === 'suspended' ? 'Заблокирован' : 'Не подтвержден'}
                    </span>
                    <span className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded">
                      {email.provider}
                    </span>
                    <span className="px-2 py-1 bg-purple-900/20 text-purple-400 text-xs rounded">
                      {email.category}
                    </span>
                    {email.persistent && (
                      <span className="px-2 py-1 bg-yellow-900/20 text-yellow-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                    {email.twoFactorEnabled && (
                      <Shield className="w-4 h-4 text-green-400" title="2FA включен" />
                    )}
                    {email.breached && (
                      <AlertTriangle className="w-4 h-4 text-red-400" title="Обнаружена утечка" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {email.firstName && (
                      <div>
                        <span className="text-gray-400">Имя:</span>
                        <p className="text-gray-300">{email.firstName} {email.lastName}</p>
                      </div>
                    )}
                    {email.password && (
                      <div>
                        <span className="text-gray-400">Пароль:</span>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-300 font-mono">
                            {showPasswords[email.id] ? email.password : '••••••••••••'}
                          </p>
                          <button
                            onClick={() => togglePasswordVisibility(email.id)}
                            className="text-gray-400 hover:text-white"
                          >
                            {showPasswords[email.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    )}
                    {email.recoveryEmail && (
                      <div>
                        <span className="text-gray-400">Резервный email:</span>
                        <p className="text-gray-300">{email.recoveryEmail}</p>
                      </div>
                    )}
                    {email.phone && (
                      <div>
                        <span className="text-gray-400">Телефон:</span>
                        <p className="text-gray-300">{email.phone}</p>
                      </div>
                    )}
                  </div>
                  
                  {email.notes && (
                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Заметки:</span>
                      <p className="text-gray-300 text-sm">{email.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 mt-3 text-xs text-gray-400">
                    <span>Создан: {email.created.toLocaleDateString('ru-RU')}</span>
                    <span>Вход: {email.lastLogin.toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(email.id)}
                    className={`p-1 rounded ${email.persistent ? 'text-yellow-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteEmail(email.id)}
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

export default EmailManager;