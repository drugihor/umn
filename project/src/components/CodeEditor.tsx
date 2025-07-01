import React, { useState } from 'react';
import { Play, Save, FileText, Code, Download, Upload } from 'lucide-react';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`# Пример Python кода
def fibonacci(n):
    """Вычисляет число Фибоначчи"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Тестирование функции
for i in range(10):
    print(f"fibonacci({i}) = {fibonacci(i)}")
`);
  
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Выполняется код...\n');
    
    setTimeout(() => {
      let result = '';
      if (language === 'python') {
        result = 'fibonacci(0) = 0\nfibonacci(1) = 1\nfibonacci(2) = 1\nfibonacci(3) = 2\nfibonacci(4) = 3\nfibonacci(5) = 5\nfibonacci(6) = 8\nfibonacci(7) = 13\nfibonacci(8) = 21\nfibonacci(9) = 34\n\nКод выполнен успешно!';
      } else if (language === 'javascript') {
        result = 'Выполнение JavaScript кода завершено успешно!';
      } else {
        result = 'Код выполнен!';
      }
      setOutput(result);
      setIsRunning(false);
    }, 2000);
  };

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'python' ? 'py' : language === 'javascript' ? 'js' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Code className="w-5 h-5 text-blue-400" />
          <h2 className="text-xl font-bold text-white">Редактор кода</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Выполняется...' : 'Запустить'}</span>
          </button>
          <button
            onClick={saveCode}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Сохранить</span>
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Загрузить</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col">
          <div className="p-2 bg-gray-750 border-b border-gray-600">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <FileText className="w-4 h-4" />
              <span>main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : 'txt'}</span>
            </div>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
            placeholder="Введите ваш код здесь..."
          />
        </div>
        
        <div className="w-1/3 border-l border-gray-700 flex flex-col">
          <div className="p-2 bg-gray-750 border-b border-gray-600">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span>Вывод</span>
              {isRunning && (
                <div className="w-3 h-3 border border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </div>
          <div className="flex-1 bg-black text-green-400 p-4 font-mono text-sm overflow-y-auto">
            <pre className="whitespace-pre-wrap">{output || 'Нажмите "Запустить" для выполнения кода'}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;