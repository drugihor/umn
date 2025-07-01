const { contextBridge, ipcRenderer } = require('electron');

// Безопасный API для рендерера
contextBridge.exposeInMainWorld('electronAPI', {
  // Основные функции
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  
  // Выполнение команд
  executeCommand: (command) => ipcRenderer.invoke('execute-command', command),
  
  // Файловые операции
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  saveFileDialog: (defaultPath, content) => ipcRenderer.invoke('save-file-dialog', defaultPath, content),
  
  // Диалоги
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  
  // События меню
  onMenuAction: (callback) => {
    ipcRenderer.on('menu-action', (event, action) => callback(action));
  },
  
  // Системные события
  onSystemInfo: (callback) => {
    ipcRenderer.on('system-info', (event, info) => callback(info));
  },
  
  onSystemUpdate: (callback) => {
    ipcRenderer.on('system-update', (event, info) => callback(info));
  },
  
  onFileOpened: (callback) => {
    ipcRenderer.on('file-opened', (event, data) => callback(data));
  },
  
  // Системная информация
  platform: process.platform,
  
  // Уведомления
  showNotification: (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  },
  
  // Удаление слушателей
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

// Запрос разрешения на уведомления при загрузке
window.addEventListener('DOMContentLoaded', () => {
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
});