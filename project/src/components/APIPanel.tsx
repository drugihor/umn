import React, { useState } from 'react';
import { Database, Plus, Trash2, Key, Globe, CheckCircle, XCircle } from 'lucide-react';

interface APIConnection {
  id: number;
  name: string;
  url: string;
  key: string;
  type: 'rest' | 'graphql' | 'websocket';
  status: 'connected' | 'disconnected' | 'error';
  lastTested: Date;
}

const APIPanel: React.FC = () => {
  const [connections, setConnections] = useState<APIConnection[]>([
    {
      id: 1,
      name: 'OpenAI API',
      url: 'https://api.openai.com/v1',
      key: 'sk-*********************',
      type: 'rest',
      status: 'connected',
      lastTested: new Date(),
    },
    {
      id: 2,
      name: 'Local Database',
      url: 'http://localhost:5432',
      key: 'password123',
      type: 'rest',
      status: 'connected',
      lastTested: new Date(),
    },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newConnection, setNewConnection] = useState({
    name: '',
    url: '',
    key: '',
    type: 'rest' as 'rest' | 'graphql' | 'websocket',
  });

  const addConnection = () => {
    if (!newConnection.name.trim() || !newConnection.url.trim()) return;
    
    const connection: APIConnection = {
      id: connections.length + 1,
      ...newConnection,
      status: 'disconnected',
      lastTested: new Date(),
    };
    
    setConnections([...connections, connection]);
    setNewConnection({ name: '', url: '', key: '', type: 'rest' });
    setShowForm(false);
  };

  const testConnection = (id: number) => {
    setConnections(connections.map(conn => 
      conn.id === id 
        ? { ...conn, status: 'connected', lastTested: new Date() }
        : conn
    ));
  };

  const deleteConnection = (id: number) => {
    setConnections(connections.filter(conn => conn.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <div className="w-5 h-5 rounded-full bg-gray-400"></div>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">API Подключения</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить API</span>
        </button>
      </div>
      
      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Название API"
              value={newConnection.name}
              onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="URL (например: https://api.example.com)"
              value={newConnection.url}
              onChange={(e) => setNewConnection({ ...newConnection, url: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            <input
              type="password"
              placeholder="API ключ или токен"
              value={newConnection.key}
              onChange={(e) => setNewConnection({ ...newConnection, key: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
            />
            <div className="flex space-x-3">
              <select
                value={newConnection.type}
                onChange={(e) => setNewConnection({ ...newConnection, type: e.target.value as any })}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-cyan-500 focus:outline-none"
              >
                <option value="rest">REST API</option>
                <option value="graphql">GraphQL</option>
                <option value="websocket">WebSocket</option>
              </select>
              <button
                onClick={addConnection}
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
          {connections.map((connection) => (
            <div
              key={connection.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(connection.status)}
                    <h3 className="text-white font-semibold">{connection.name}</h3>
                    <span className="px-2 py-1 rounded text-xs bg-blue-900/20 text-blue-400">
                      {connection.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 text-sm mb-2">
                    <Globe className="w-4 h-4" />
                    <span>{connection.url}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300 text-sm mb-3">
                    <Key className="w-4 h-4" />
                    <span>{connection.key.replace(/./g, '*').slice(0, 20)}...</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => testConnection(connection.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Тест подключения
                    </button>
                    <span className="text-gray-400 text-xs">
                      Последний тест: {connection.lastTested.toLocaleString('ru-RU')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteConnection(connection.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIPanel;