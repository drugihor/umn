import React, { useState } from 'react';
import { Cloud, Server, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Deployment {
  id: number;
  name: string;
  type: 'local' | 'cloud' | 'docker';
  status: 'ready' | 'deploying' | 'deployed' | 'failed';
  url?: string;
  lastDeployed?: Date;
}

const DeployPanel: React.FC = () => {
  const [deployments, setDeployments] = useState<Deployment[]>([
    {
      id: 1,
      name: 'Локальный сервер',
      type: 'local',
      status: 'deployed',
      url: 'http://localhost:3000',
      lastDeployed: new Date(),
    },
    {
      id: 2,
      name: 'Продакшн сервер',
      type: 'cloud',
      status: 'ready',
    },
  ]);

  const deployProject = (id: number) => {
    setDeployments(deployments.map(dep => 
      dep.id === id 
        ? { ...dep, status: 'deploying' }
        : dep
    ));
    
    setTimeout(() => {
      setDeployments(prev => prev.map(dep => 
        dep.id === id 
          ? { 
              ...dep, 
              status: 'deployed', 
              url: dep.type === 'local' ? 'http://localhost:3000' : 'https://myapp.example.com',
              lastDeployed: new Date()
            }
          : dep
      ));
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'deploying': return <Clock className="w-5 h-5 text-yellow-400 animate-spin" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <div className="w-5 h-5 rounded-full bg-gray-400"></div>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cloud': return <Cloud className="w-5 h-5 text-blue-400" />;
      case 'docker': return <Server className="w-5 h-5 text-purple-400" />;
      default: return <Server className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <Cloud className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-white">Развертывание</h2>
        </div>
        <p className="text-gray-300 text-sm mt-1">Управление развертыванием проектов</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {deployments.map((deployment) => (
            <div
              key={deployment.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(deployment.type)}
                  <h3 className="text-white font-semibold">{deployment.name}</h3>
                  <span className="px-2 py-1 rounded text-xs bg-indigo-900/20 text-indigo-400">
                    {deployment.type === 'local' ? 'Локально' : 
                     deployment.type === 'cloud' ? 'Облако' : 'Docker'}
                  </span>
                </div>
                {getStatusIcon(deployment.status)}
              </div>
              
              {deployment.url && (
                <div className="mb-3">
                  <a
                    href={deployment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    {deployment.url}
                  </a>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  {deployment.lastDeployed && (
                    <span className="text-gray-400">
                      Последнее развертывание: {deployment.lastDeployed.toLocaleString('ru-RU')}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => deployProject(deployment.id)}
                    disabled={deployment.status === 'deploying'}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>
                      {deployment.status === 'deploying' ? 'Развертывание...' : 'Развернуть'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
          <h3 className="text-white font-semibold mb-3">Варианты развертывания</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-gray-600 rounded border border-gray-500">
              <div className="flex items-center space-x-2 mb-2">
                <Server className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">Локально</span>
              </div>
              <p className="text-gray-300 text-sm">Развертывание на локальной машине</p>
            </div>
            
            <div className="p-3 bg-gray-600 rounded border border-gray-500">
              <div className="flex items-center space-x-2 mb-2">
                <Cloud className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Облако</span>
              </div>
              <p className="text-gray-300 text-sm">AWS, Google Cloud, Azure</p>
            </div>
            
            <div className="p-3 bg-gray-600 rounded border border-gray-500">
              <div className="flex items-center space-x-2 mb-2">
                <Server className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Docker</span>
              </div>
              <p className="text-gray-300 text-sm">Контейнеризация приложения</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployPanel;