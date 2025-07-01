import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import ParserPanel from './components/ParserPanel';
import TerminalPanel from './components/TerminalPanel';
import TasksPanel from './components/TasksPanel';
import CodeEditor from './components/CodeEditor';
import APIPanel from './components/APIPanel';
import DeployPanel from './components/DeployPanel';
import SettingsPanel from './components/SettingsPanel';
import AdminPanel from './components/AdminPanel';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatPanel />;
      case 'parser':
        return <ParserPanel />;
      case 'terminal':
        return <TerminalPanel />;
      case 'tasks':
        return <TasksPanel />;
      case 'code':
        return <CodeEditor />;
      case 'api':
        return <APIPanel />;
      case 'deploy':
        return <DeployPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <ChatPanel />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderActivePanel()}
      </div>
    </div>
  );
}

export default App;