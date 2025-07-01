import React, { useState } from 'react';
import { Dns, Plus, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

interface DNSEntry {
  id: number;
  domain: string;
  recordType: 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SOA';
  value: string;
  ttl: number;
  priority?: number;
  status: 'resolved' | 'failed' | 'checking';
  persistent: boolean;
  lastChecked: Date;
  responseTime: number;
  server: string;
}

const DNSManager: React.FC = () => {
  const [dnsRecords, setDnsRecords] = useState<DNSEntry[]>([
    {
      id: 1,
      domain: 'example.com',
      recordType: 'A',
      value: '93.184.216.34',
      ttl: 3600,
      status: 'resolved',
      persistent: true,
      lastChecked: new Date(),
      responseTime: 45,
      server: '8.8.8.8'
    },
    {
      id: 2,
      domain: 'mail.example.com',
      recordType: 'MX',
      value: 'mail.example.com',
      ttl: 1800,
      priority: 10,
      status: 'resolved',
      persistent: false,
      lastChecked: new Date(),
      responseTime: 67,
      server: '1.1.1.1'
    },
    {
      id: 3,
      domain: 'test.local',
      recordType: 'A',
      value: '',
      ttl: 0,
      status: 'failed',
      persistent: false,
      lastChecked: new Date(),
      responseTime: 0,
      server: '8.8.8.8'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    domain: '',
    recordType: 'A' as 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SOA',
    server: '8.8.8.8',
    persistent: false
  });

  const addRecord = () => {
    if (!newRecord.domain.trim()) return;
    
    const record: DNSEntry = {
      id: dnsRecords.length + 1,
      ...newRecord,
      value: '',
      ttl: 0,
      status: 'checking',
      lastChecked: new Date(),
      responseTime: 0
    };
    
    setDnsRecords([...dnsRecords, record]);
    setNewRecord({
      domain: '',
      recordType: 'A',
      server: '8.8.8.8',
      persistent: false
    });
    setShowForm(false);
  };

  const togglePersistent = (id: number) => {
    setDnsRecords(dnsRecords.map(record => 
      record.id === id ? { ...record, persistent: !record.persistent } : record
    ));
  };

  const deleteRecord = (id: number) => {
    setDnsRecords(dnsRecords.filter(record => record.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'checking': return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      default: return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-400 bg-green-900/20';
      case 'failed': return 'text-red-400 bg-red-900/20';
      case 'checking': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getRecordTypeColor = (type: string) => {
    const colors = {
      'A': 'text-blue-400 bg-blue-900/20',
      'AAAA': 'text-purple-400 bg-purple-900/20',
      'CNAME': 'text-green-400 bg-green-900/20',
      'MX': 'text-orange-400 bg-orange-900/20',
      'TXT': 'text-yellow-400 bg-yellow-900/20',
      'NS': 'text-cyan-400 bg-cyan-900/20',
      'SOA': 'text-pink-400 bg-pink-900/20'
    };
    return colors[type] || 'text-gray-400 bg-gray-900/20';
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Dns className="w-5 h-5 text-indigo-400" />
            <h3 className="text-xl font-bold text-white">DNS Менеджер</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить запись</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Домен (например: example.com)"
              value={newRecord.domain}
              onChange={(e) => setNewRecord({ ...newRecord, domain: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-indigo-500 focus:outline-none"
            />
            <select
              value={newRecord.recordType}
              onChange={(e) => setNewRecord({ ...newRecord, recordType: e.target.value as any })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-indigo-500 focus:outline-none"
            >
              <option value="A">A (IPv4)</option>
              <option value="AAAA">AAAA (IPv6)</option>
              <option value="CNAME">CNAME</option>
              <option value="MX">MX (Mail)</option>
              <option value="TXT">TXT</option>
              <option value="NS">NS</option>
              <option value="SOA">SOA</option>
            </select>
            <select
              value={newRecord.server}
              onChange={(e) => setNewRecord({ ...newRecord, server: e.target.value })}
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-indigo-500 focus:outline-none"
            >
              <option value="8.8.8.8">Google DNS (8.8.8.8)</option>
              <option value="1.1.1.1">Cloudflare DNS (1.1.1.1)</option>
              <option value="208.67.222.222">OpenDNS (208.67.222.222)</option>
              <option value="77.88.8.8">Yandex DNS (77.88.8.8)</option>
            </select>
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newRecord.persistent}
                  onChange={(e) => setNewRecord({ ...newRecord, persistent: e.target.checked })}
                />
                <span className="text-gray-300">Персистентный</span>
              </label>
            </div>
          </div>
          <div className="flex space-x-3 mt-3">
            <button
              onClick={addRecord}
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
          {dnsRecords.map((record) => (
            <div
              key={record.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(record.status)}
                    <h4 className="text-white font-semibold">{record.domain}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getRecordTypeColor(record.recordType)}`}>
                      {record.recordType}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(record.status)}`}>
                      {record.status === 'resolved' ? 'Разрешен' :
                       record.status === 'failed' ? 'Ошибка' : 'Проверка'}
                    </span>
                    {record.persistent && (
                      <span className="px-2 py-1 bg-indigo-900/20 text-indigo-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Значение:</span>
                      <p className="text-gray-300 font-mono">{record.value || 'Не разрешено'}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">TTL:</span>
                      <p className="text-gray-300">{record.ttl > 0 ? `${record.ttl}s` : 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">DNS сервер:</span>
                      <p className="text-gray-300">{record.server}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Время отклика:</span>
                      <p className="text-gray-300">{record.responseTime > 0 ? `${record.responseTime}ms` : 'N/A'}</p>
                    </div>
                  </div>
                  
                  {record.priority && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-400">Приоритет:</span>
                      <span className="text-gray-300 ml-2">{record.priority}</span>
                    </div>
                  )}
                  
                  <div className="mt-3 text-xs text-gray-400">
                    Проверен: {record.lastChecked.toLocaleString('ru-RU')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(record.id)}
                    className={`p-1 rounded ${record.persistent ? 'text-indigo-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <Dns className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRecord(record.id)}
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

export default DNSManager;