import React, { useState } from 'react';
import { Shield, Plus, Trash2, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface CertificateEntry {
  id: number;
  domain: string;
  issuer: string;
  subject: string;
  serialNumber: string;
  validFrom: Date;
  validTo: Date;
  fingerprint: string;
  algorithm: string;
  keySize: number;
  status: 'valid' | 'expired' | 'revoked' | 'self-signed';
  persistent: boolean;
  lastChecked: Date;
  chain: string[];
}

const CertificateManager: React.FC = () => {
  const [certificates, setCertificates] = useState<CertificateEntry[]>([
    {
      id: 1,
      domain: 'example.com',
      issuer: 'Let\'s Encrypt Authority X3',
      subject: 'CN=example.com',
      serialNumber: '03:4B:9C:D2:E8:F1:A7:B3',
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      fingerprint: 'SHA256:A1:B2:C3:D4:E5:F6:07:08:09:0A:0B:0C:0D:0E:0F:10',
      algorithm: 'RSA',
      keySize: 2048,
      status: 'valid',
      persistent: true,
      lastChecked: new Date(),
      chain: ['Root CA', 'Intermediate CA', 'End Entity']
    },
    {
      id: 2,
      domain: 'test.local',
      issuer: 'Self-Signed',
      subject: 'CN=test.local',
      serialNumber: '01:23:45:67:89:AB:CD:EF',
      validFrom: new Date('2023-01-01'),
      validTo: new Date('2025-01-01'),
      fingerprint: 'SHA256:F1:E2:D3:C4:B5:A6:97:88:79:6A:5B:4C:3D:2E:1F:00',
      algorithm: 'RSA',
      keySize: 4096,
      status: 'self-signed',
      persistent: false,
      lastChecked: new Date(),
      chain: ['Self-Signed']
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newCert, setNewCert] = useState({
    domain: '',
    persistent: false
  });

  const addCertificate = () => {
    if (!newCert.domain.trim()) return;
    
    const cert: CertificateEntry = {
      id: certificates.length + 1,
      domain: newCert.domain,
      issuer: 'Unknown',
      subject: `CN=${newCert.domain}`,
      serialNumber: 'Pending...',
      validFrom: new Date(),
      validTo: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      fingerprint: 'Pending...',
      algorithm: 'RSA',
      keySize: 2048,
      status: 'valid',
      persistent: newCert.persistent,
      lastChecked: new Date(),
      chain: []
    };
    
    setCertificates([...certificates, cert]);
    setNewCert({ domain: '', persistent: false });
    setShowForm(false);
  };

  const togglePersistent = (id: number) => {
    setCertificates(certificates.map(cert => 
      cert.id === id ? { ...cert, persistent: !cert.persistent } : cert
    ));
  };

  const deleteCertificate = (id: number) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'expired': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'revoked': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'self-signed': return <Clock className="w-4 h-4 text-yellow-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-400 bg-green-900/20';
      case 'expired': return 'text-red-400 bg-red-900/20';
      case 'revoked': return 'text-red-400 bg-red-900/20';
      case 'self-signed': return 'text-yellow-400 bg-yellow-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-bold text-white">Менеджер сертификатов</h3>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить сертификат</span>
          </button>
        </div>
      </div>

      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Домен (например: example.com)"
              value={newCert.domain}
              onChange={(e) => setNewCert({ ...newCert, domain: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-green-500 focus:outline-none"
            />
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCert.persistent}
                  onChange={(e) => setNewCert({ ...newCert, persistent: e.target.checked })}
                />
                <span className="text-gray-300">Персистентный</span>
              </label>
              <button
                onClick={addCertificate}
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
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(cert.status)}
                    <h4 className="text-white font-semibold">{cert.domain}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(cert.status)}`}>
                      {cert.status === 'valid' ? 'Действителен' :
                       cert.status === 'expired' ? 'Истек' :
                       cert.status === 'revoked' ? 'Отозван' : 'Самоподписанный'}
                    </span>
                    {cert.persistent && (
                      <span className="px-2 py-1 bg-green-900/20 text-green-400 text-xs rounded">
                        Персистентный
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Издатель:</span>
                      <p className="text-gray-300">{cert.issuer}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Субъект:</span>
                      <p className="text-gray-300">{cert.subject}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Серийный номер:</span>
                      <p className="text-gray-300 font-mono text-xs">{cert.serialNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Алгоритм:</span>
                      <p className="text-gray-300">{cert.algorithm} {cert.keySize} бит</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Действителен с:</span>
                      <p className="text-gray-300">{cert.validFrom.toLocaleDateString('ru-RU')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Действителен до:</span>
                      <p className="text-gray-300">{cert.validTo.toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <span className="text-gray-400 text-sm">Отпечаток:</span>
                    <p className="text-gray-300 font-mono text-xs break-all">{cert.fingerprint}</p>
                  </div>
                  
                  {cert.chain.length > 0 && (
                    <div className="mt-3">
                      <span className="text-gray-400 text-sm">Цепочка сертификатов:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {cert.chain.map((item, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 text-xs text-gray-400">
                    Проверен: {cert.lastChecked.toLocaleString('ru-RU')}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePersistent(cert.id)}
                    className={`p-1 rounded ${cert.persistent ? 'text-green-400' : 'text-gray-400'} hover:bg-gray-600`}
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteCertificate(cert.id)}
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

export default CertificateManager;