import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, Square, Trash2, Download } from 'lucide-react';

const TerminalPanel: React.FC = () => {
  const [output, setOutput] = useState([
    '$ ИИ Терминал готов к работе',
    '$ Введите команду или код для выполнения...',
  ]);
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const executeCommand = () => {
    if (!input.trim()) return;
    
    setIsRunning(true);
    const newOutput = [...output, `$ ${input}`];
    setOutput(newOutput);
    
    // Симуляция выполнения команды
    setTimeout(() => {
      let result = '';
      
      if (input.includes('python') || input.includes('print')) {
        result = 'Выполняю Python код...\nВывод: Успешно выполнено!';
      } else if (input.includes('node') || input.includes('console.log')) {
        result = 'Выполняю Node.js код...\nВывод: Программа запущена успешно!';
      } else if (input.includes('git')) {
        result = 'Git операция выполнена успешно';
      } else if (input.includes('ls') || input.includes('dir')) {
        result = 'app.py  config.json  data/  models/  requirements.txt';
      } else {
        result = `Команда "${input}" выполнена`;
      }
      
      setOutput(prev => [...prev, result]);
      setIsRunning(false);
    }, 1500);
    
    setInput('');
  };

  const clearTerminal = () => {
    setOutput(['$ Терминал очищен', '$ ИИ Терминал готов к работе']);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-bold text-white">Терминал</h2>
          <span className={`px-2 py-1 rounded text-xs ${
            isRunning ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white'
          }`}>
            {isRunning ? 'Выполняется' : 'Готов'}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={clearTerminal}
            className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 flex items-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Очистить</span>
          </button>
          <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>Сохранить</span>
          </button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-black text-green-400"
      >
        {output.map((line, index) => (
          <div key={index} className="mb-1">
            {line}
          </div>
        ))}
        {isRunning && (
          <div className="flex items-center space-x-2 text-yellow-400">
            <div className="animate-spin w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
            <span>Выполняется...</span>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-3">
          <span className="text-green-400 font-mono">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
            placeholder="Введите команду или код..."
            className="flex-1 bg-transparent text-green-400 font-mono focus:outline-none"
            disabled={isRunning}
          />
          <button
            onClick={executeCommand}
            disabled={isRunning}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Стоп' : 'Выполнить'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TerminalPanel;