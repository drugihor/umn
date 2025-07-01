const { app, BrowserWindow, Menu, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const os = require('os');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    titleBarStyle: 'default',
    show: false,
    frame: true,
    backgroundColor: '#1f2937'
  });

  // Загрузка приложения
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Показать окно когда готово
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Отправить системную информацию в рендерер
    mainWindow.webContents.send('system-info', {
      platform: process.platform,
      arch: process.arch,
      version: process.version,
      memory: process.memoryUsage(),
      uptime: process.uptime()
    });
  });

  // Обработка закрытия окна
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Открытие внешних ссылок в браузере
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Создание меню приложения
function createMenu() {
  const template = [
    {
      label: 'Файл',
      submenu: [
        {
          label: 'Новый проект',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('menu-action', 'new-project');
          }
        },
        {
          label: 'Открыть файл',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'Все файлы', extensions: ['*'] },
                { name: 'Python', extensions: ['py'] },
                { name: 'JavaScript', extensions: ['js', 'ts'] },
                { name: 'Текст', extensions: ['txt', 'md'] }
              ]
            });
            
            if (!result.canceled) {
              const filePath = result.filePaths[0];
              const content = fs.readFileSync(filePath, 'utf8');
              mainWindow.webContents.send('file-opened', { path: filePath, content });
            }
          }
        },
        {
          label: 'Сохранить',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('menu-action', 'save');
          }
        },
        { type: 'separator' },
        {
          label: 'Настройки',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.webContents.send('menu-action', 'settings');
          }
        },
        { type: 'separator' },
        {
          label: 'Выход',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Правка',
      submenu: [
        { role: 'undo', label: 'Отменить' },
        { role: 'redo', label: 'Повторить' },
        { type: 'separator' },
        { role: 'cut', label: 'Вырезать' },
        { role: 'copy', label: 'Копировать' },
        { role: 'paste', label: 'Вставить' },
        { role: 'selectall', label: 'Выделить все' }
      ]
    },
    {
      label: 'ИИ-Агент',
      submenu: [
        {
          label: 'Запустить терминал',
          accelerator: 'CmdOrCtrl+T',
          click: () => {
            mainWindow.webContents.send('menu-action', 'terminal');
          }
        },
        {
          label: 'Редактор кода',
          accelerator: 'CmdOrCtrl+E',
          click: () => {
            mainWindow.webContents.send('menu-action', 'code-editor');
          }
        },
        {
          label: 'Панель администратора',
          accelerator: 'CmdOrCtrl+Shift+A',
          click: () => {
            mainWindow.webContents.send('menu-action', 'admin');
          }
        }
      ]
    },
    {
      label: 'Вид',
      submenu: [
        { role: 'reload', label: 'Перезагрузить' },
        { role: 'forceReload', label: 'Принудительная перезагрузка' },
        { role: 'toggleDevTools', label: 'Инструменты разработчика' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Сбросить масштаб' },
        { role: 'zoomIn', label: 'Увеличить' },
        { role: 'zoomOut', label: 'Уменьшить' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Полный экран' }
      ]
    },
    {
      label: 'Помощь',
      submenu: [
        {
          label: 'О программе ИИ-Агент',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'О программе',
              message: 'ИИ-Агент v1.0',
              detail: 'Интеллектуальный помощник для программирования и системного администрирования.\n\nВозможности:\n• Программирование на Python, JavaScript\n• Работа с API\n• Системное администрирование\n• Терминал и редактор кода\n• Управление задачами'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// События приложения
app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC обработчики для взаимодействия с рендерером
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-system-info', () => {
  return {
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    hostname: os.hostname(),
    uptime: os.uptime(),
    memory: {
      total: os.totalmem(),
      free: os.freemem()
    },
    cpus: os.cpus(),
    networkInterfaces: os.networkInterfaces()
  };
});

ipcMain.handle('execute-command', async (event, command) => {
  return new Promise((resolve, reject) => {
    exec(command, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        resolve({ success: false, error: error.message, stderr });
      } else {
        resolve({ success: true, stdout, stderr });
      }
    });
  });
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('write-file', async (event, filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-file-dialog', async (event, defaultPath, content) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath,
    filters: [
      { name: 'Python', extensions: ['py'] },
      { name: 'JavaScript', extensions: ['js'] },
      { name: 'TypeScript', extensions: ['ts'] },
      { name: 'Текст', extensions: ['txt'] },
      { name: 'Все файлы', extensions: ['*'] }
    ]
  });
  
  if (!result.canceled) {
    try {
      fs.writeFileSync(result.filePath, content, 'utf8');
      return { success: true, filePath: result.filePath };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  return { success: false, canceled: true };
});

ipcMain.handle('show-message-box', async (event, options) => {
  const result = await dialog.showMessageBox(mainWindow, options);
  return result;
});

ipcMain.handle('open-external', async (event, url) => {
  shell.openExternal(url);
});

// Мониторинг системы
setInterval(() => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    const memUsage = process.memoryUsage();
    const systemInfo = {
      memory: {
        used: memUsage.heapUsed,
        total: memUsage.heapTotal,
        system: {
          free: os.freemem(),
          total: os.totalmem()
        }
      },
      uptime: process.uptime(),
      cpu: process.cpuUsage()
    };
    
    mainWindow.webContents.send('system-update', systemInfo);
  }
}, 5000);