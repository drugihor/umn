import React, { useState } from 'react';
import { Globe, Plus, Trash2, Edit, Eye, EyeOff, Download, Filter, Search } from 'lucide-react';

interface URLEntry {
  id: number;
  url: string;
  domain: string;
  protocol: string;
  status: 'active' | 'inactive' | 'blocked';
  persistent: boolean;
  lastChecked: Date;
  responseTime: number;
  tags: string[];
  notes: string;
}

const URLManager: React.FC = () => {
  const [urls, setUrls] = useState<URLEntry[]>([
    {
      id: 1,
      url: 'https://example.com/api/users',
      domain: 'example.com',
      protocol: 'https',
      status: 'active',
      persistent: true,
      lastChecked: new Date(),
      responseTime: 245,
      tags: ['api', 'users'],
      notes: 'Основной API для пользователей'
    },
    {
      id: 2,
      url: 'http://test.local/admin',
      domain: 'test.local',
      protocol: 'http',
      status: 'inactive',
      persistent: false,
      lastChecked: new Date(),
      responseTime: 0,
      tags: ['admin', 'local'],
      notes: 'Тестовая админка'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newUrl, setNewUrl] = useState({
    url: '',
    tags: '',
    notes: '',
    persistent: false
  });

  const addUrl = () => {
    if (!newUrl.url.trim()) return;
    
    try {
      const urlObj = new URL(newUrl.url);
      const entry: URLEntry = {
        id: urls.length + 1,
        url: newUrl.url,
        domain: urlObj.hostname,
        protocol: urlObj.protocol.replace(':', ''),
        status: 'active',
        persistent: newUrl.persistent,
        lastChecked: new Date(),
        responseTime: 0,
        tags: newUrl.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        notes: newUrl.notes
      };
      
      setUrls([...urls, entry]);
      setNewUrl({ url: '', tags: '', notes: '', persistent: false });
      setShowForm(false);
    } catch (error) {
      alert('Неверный формат URL');
    }
  };

  const togglePersistent = (id: number) => {
    setUrls(urls.map(url => 
      url.id === id ? { ...url, persistent: !url.persistent } : url
    ));
  };

  const deleteUrl = (id: number) => {
    setUrls(urls.filter(url => url.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/20';
      case 'inactive': return 'text-red-400 bg-red-900/20';
      case 'blocked': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const filteredUrls = urls.filter(url => {
    const matchesSearch = url.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         url.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         url.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || url.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-xl font-bold text-white">URL Менеджер</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить URL</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по URL, домену или тегам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
          >
            <option value="all">Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="blocked">Заблокированные</option>
          </select>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="URL (например: https://example.com/api)"
              value={newUrl.url}
              onChange={(e) => setNewUrl({ ...newUrl, url: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Теги (через запятую)"
              value={newUrl.tags}
              onChange={(e) => setNewUrl({ ...newUrl, tags: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Заметки"
              value={newUrl.notes}
              onChange={(e) => setNewUrl({ ...newUrl, notes: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-20 resize-none"
            />
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newUrl.persistent}
                  onChange={(e) => setNewUrl({ ...newUrl, persistent: e.target.checked })}
                  className="rounded"
                />
                <span className="text-gray-300">Персистентный</span>
              </label>
              <button
                onClick={addUrl}
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
          {filteredUrls.map((url) => (
            <div
              key={url.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(url.status)}`}>
                      {url.status === 'active' ? 'Активен' : 
                       url.status === 'inactive' ? 'Неактивен' : 'Заблокирован'}
                    </span>
                    <span className="text-gray-400 text-xs">{url.protocol.toUpperCase()}</span>
                    <span className="text-gray-400 text-xs">{url.responseTime}ms</span>
                    {url.persistent && (
                      <span className="px-2 py-1 bg-blue-900/20 text-blue-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-white font-semibold mb-1">{url.domain}</h4>
                  <p className="text-gray-300 text-sm mb-2 break-all">{url.url}</p>
                  
                  {url.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {url.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {url.notes && (
                    <p className="text-gray-400 text-sm mb-2">{url.notes}</p>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>Проверен: {url.lastChecked.toLocaleString('ru-RU')}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(url.id)}
                    className={`p-1 rounded ${url.persistent ? 'text-blue-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    {url.persistent ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white hover:bg-gray-600 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteUrl(url.id)}
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

export default URLManager;