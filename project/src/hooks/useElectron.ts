import { useEffect, useState } from 'react';

interface SystemInfo {
  platform: string;
  arch: string;
  release: string;
  hostname: string;
  uptime: number;
  memory: {
    total: number;
    free: number;
  };
  cpus: any[];
  networkInterfaces: any;
}

interface SystemUpdate {
  memory: {
    used: number;
    total: number;
    system: {
      free: number;
      total: number;
    };
  };
  uptime: number;
  cpu: any;
}

export const useElectron = () => {
  const [isElectron, setIsElectron] = useState(false);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [systemUpdate, setSystemUpdate] = useState<SystemUpdate | null>(null);

  useEffect(() => {
    // Проверяем, запущено ли в Electron
    if (typeof window !== 'undefined' && window.electronAPI) {
      setIsElectron(true);
      
      // Получаем системную информацию
      window.electronAPI.getSystemInfo().then(setSystemInfo);
      
      // Подписываемся на обновления системы
      window.electronAPI.onSystemUpdate(setSystemUpdate);
      
      // Подписываемся на события меню
      window.electronAPI.onMenuAction((action: string) => {
        console.log('Menu action:', action);
        // Здесь можно обработать действия меню
      });
      
      // Подписываемся на открытие файлов
      window.electronAPI.onFileOpened((data: { path: string; content: string }) => {
        console.log('File opened:', data);
        // Здесь можно обработать открытие файла
      });
    }

    return () => {
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('system-update');
        window.electronAPI.removeAllListeners('menu-action');
        window.electronAPI.removeAllListeners('file-opened');
      }
    };
  }, []);

  const executeCommand = async (command: string) => {
    if (!isElectron) return null;
    return await window.electronAPI.executeCommand(command);
  };

  const saveFile = async (content: string, defaultName: string = 'untitled.txt') => {
    if (!isElectron) return null;
    return await window.electronAPI.saveFileDialog(defaultName, content);
  };

  const showNotification = (title: string, body: string) => {
    if (isElectron) {
      window.electronAPI.showNotification(title, body);
    } else {
      // Fallback для веб-версии
      if (Notification.permission === 'granted') {
        new Notification(title, { body });
      }
    }
  };

  return {
    isElectron,
    systemInfo,
    systemUpdate,
    executeCommand,
    saveFile,
    showNotification,
    electronAPI: isElectron ? window.electronAPI : null
  };
};

// Типы для TypeScript
declare global {
  interface Window {
    electronAPI: {
      getAppVersion: () => Promise<string>;
      getSystemInfo: () => Promise<SystemInfo>;
      executeCommand: (command: string) => Promise<any>;
      readFile: (filePath: string) => Promise<any>;
      writeFile: (filePath: string, content: string) => Promise<any>;
      saveFileDialog: (defaultPath: string, content: string) => Promise<any>;
      showMessageBox: (options: any) => Promise<any>;
      openExternal: (url: string) => Promise<void>;
      onMenuAction: (callback: (action: string) => void) => void;
      onSystemInfo: (callback: (info: SystemInfo) => void) => void;
      onSystemUpdate: (callback: (info: SystemUpdate) => void) => void;
      onFileOpened: (callback: (data: { path: string; content: string }) => void) => void;
      platform: string;
      showNotification: (title: string, body: string) => void;
      removeAllListeners: (channel: string) => void;
    };
  }
}