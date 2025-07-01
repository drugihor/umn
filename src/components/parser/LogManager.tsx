import React, { useState } from 'react';
import { FileText, Plus, Trash2, Filter, Download, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'debug';
  source: string;
  message: string;
  details?: string;
  category: string;
  persistent: boolean;
  tags: string[];
}

const LogManager: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 1,
      timestamp: new Date(),
      level: 'info',
      source: 'URLParser',
      message: 'Successfully parsed 150 URLs',
      details: 'Parsed URLs from example.com domain',
      category: 'Parser',
      persistent: true,
      tags: ['parsing', 'success']
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 300000),
      level: 'warning',
      source: 'ProxyManager',
      message: 'Proxy connection timeout',
      details: 'Proxy 192.168.1.100:8080 failed to respond within 30 seconds',
      category: 'Network',
      persistent: false,
      tags: ['proxy', 'timeout']
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 600000),
      level: 'error',
      source: 'CookieManager',
      message: 'Failed to save cookie',
      details: 'Cookie validation failed: invalid domain format',
      category: 'Storage',
      persistent: true,
      tags: ['cookie', 'validation', 'error']
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [newLog, setNewLog] = useState({
    level: 'info' as 'info' | 'warning' | 'error' | 'debug',
    source: '',
    message: '',
    details: '',
    category: 'General',
    tags: '',
    persistent: false
  });

  const addLog = () => {
    if (!newLog.source.trim() || !newLog.message.trim()) return;
    
    const log: LogEntry = {
      id: logs.length + 1,
      timestamp: new Date(),
      ...newLog,
      tags: newLog.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    
    setLogs([log, ...logs]);
    setNewLog({
      level: 'info',
      source: '',
      message: '',
      details: '',
      category: 'General',
      tags: '',
      persistent: false
    });
    setShowForm(false);
  };

  const togglePersistent = (id: number) => {
    setLogs(logs.map(log => 
      log.id === id ? { ...log, persistent: !log.persistent } : log
    ));
  };

  const deleteLog = (id: number) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'debug': return <CheckCircle className="w-4 h-4 text-gray-400" />;
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'info': return 'text-blue-400 bg-blue-900/20';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20';
      case 'error': return 'text-red-400 bg-red-900/20';
      case 'debug': return 'text-gray-400 bg-gray-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    return matchesLevel && matchesCategory;
  });

  const categories = ['General', 'Parser', 'Network', 'Storage', 'Security', 'System'];

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-400" />
            <h3 className="text-xl font-bold text-white">Менеджер логов</h3>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Экспорт</span>
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить лог</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-3">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-gray-500 focus:outline-none"
          >
            <option value="all">Все уровни</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
            <option value="debug">Debug</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-gray-500 focus:outline-none"
          >
            <option value="all">Все категории</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={newLog.level}
              onChange={(e) => setNewLog({ ...newLog, level: e.target.value as any })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-gray-500 focus:outline-none"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="debug">Debug</option>
            </select>
            <input
              type="text"
              placeholder="Источник"
              value={newLog.source}
              onChange={(e) => setNewLog({ ...newLog, source: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-gray-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Сообщение"
              value={newLog.message}
              onChange={(e) => setNewLog({ ...newLog, message: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-gray-500 focus:outline-none"
            />
            <select
              value={newLog.category}
              onChange={(e) => setNewLog({ ...newLog, category: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-gray-500 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Детали (опционально)"
            value={newLog.details}
            onChange={(e) => setNewLog({ ...newLog, details: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-gray-500 focus:outline-none h-20 resize-none mt-3"
          />
          <input
            type="text"
            placeholder="Теги (через запятую)"
            value={newLog.tags}
            onChange={(e) => setNewLog({ ...newLog, tags: e.target.value })}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-gray-500 focus:outline-none mt-3"
          />
          <div className="flex items-center space-x-3 mt-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newLog.persistent}
                onChange={(e) => setNewLog({ ...newLog, persistent: e.target.checked })}
              />
              <span className="text-gray-300">Персистентный</span>
            </label>
            <button
              onClick={addLog}
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
        <div className="space-y-2">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-gray-700 rounded-lg p-3 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    {getLevelIcon(log.level)}
                    <span className="text-gray-400 text-xs font-mono">
                      {log.timestamp.toLocaleString('ru-RU')}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getLevelColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded">
                      {log.category}
                    </span>
                    <span className="text-gray-400 text-xs">[{log.source}]</span>
                    {log.persistent && (
                      <span className="px-2 py-1 bg-gray-900/20 text-gray-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                  </div>
                  
                  <p className="text-white text-sm mb-1">{log.message}</p>
                  
                  {log.details && (
                    <p className="text-gray-300 text-xs mb-2">{log.details}</p>
                  )}
                  
                  {log.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {log.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-1 py-0.5 bg-gray-600 text-gray-300 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(log.id)}
                    className={`p-1 rounded ${log.persistent ? 'text-gray-400' : 'text-gray-500'} hover:bg-gray-600`}
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteLog(log.id)}
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

export default LogManager;