import React, { useState } from 'react';
import { Plus, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
}

const TasksPanel: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Создать API для пользователей',
      description: 'Разработать REST API с аутентификацией',
      priority: 'high',
      status: 'in-progress',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Оптимизировать базу данных',
      description: 'Добавить индексы и оптимизировать запросы',
      priority: 'medium',
      status: 'pending',
      createdAt: new Date(),
    },
  ]);
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
  });
  
  const [showForm, setShowForm] = useState(false);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: tasks.length + 1,
      ...newTask,
      status: 'pending',
      createdAt: new Date(),
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium' });
    setShowForm(false);
  };

  const updateTaskStatus = (id: number, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-yellow-400" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Задачи</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Новая задача</span>
        </button>
      </div>
      
      {showForm && (
        <div className="p-4 border-b border-gray-700 bg-gray-750">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Название задачи"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <textarea
              placeholder="Описание задачи"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none h-20 resize-none"
            />
            <div className="flex space-x-3">
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                <option value="low">Низкий приоритет</option>
                <option value="medium">Средний приоритет</option>
                <option value="high">Высокий приоритет</option>
              </select>
              <button
                onClick={addTask}
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
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(task.status)}
                    <h3 className="text-white font-semibold">{task.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority === 'high' ? 'Высокий' : 
                       task.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as Task['status'])}
                      className="bg-gray-600 text-white px-2 py-1 rounded text-sm border border-gray-500"
                    >
                      <option value="pending">Ожидает</option>
                      <option value="in-progress">В работе</option>
                      <option value="completed">Завершено</option>
                    </select>
                    <span className="text-gray-400 text-xs">
                      {task.createdAt.toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
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

export default TasksPanel;