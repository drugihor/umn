import React, { useState } from 'react';
import { Send, User, Bot, Copy, Download } from 'lucide-react';

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Привет! Я ваш ИИ-агент. Я умею программировать, работать с API и выполнять системные задачи. Чем могу помочь?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Симуляция ответа ИИ
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'assistant',
        content: 'Понял вашу задачу. Сейчас напишу код для решения этой проблемы...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">ИИ Агент</h2>
        <p className="text-gray-300 text-sm">Программирование • API • Системные задачи</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex space-x-3 ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className={`flex space-x-3 max-w-3xl ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}>
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-75">
                    {message.timestamp.toLocaleTimeString('ru-RU')}
                  </span>
                  {message.type === 'assistant' && (
                    <div className="flex space-x-1">
                      <button className="p-1 hover:bg-gray-600 rounded">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-gray-600 rounded">
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Опишите задачу или задайте вопрос..."
            className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>Отправить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;