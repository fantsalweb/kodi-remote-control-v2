const { app, BrowserWindow } = require('electron');
const path = require('path');

// 💡 IMPORTANTE: El plugin de Vite establece estas variables de entorno
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL; 
const VITE_RENDERER_ASSETS_URL = process.env.VITE_RENDERER_ASSETS_URL; 

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      additionalArguments: [`--base-dir=${__dirname}`]
    }
  });

  // 🎯 CAMBIO CLAVE: Cargar la URL del servidor de desarrollo de Vite
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // Si estás en producción (después del build), se usa file://
    win.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(createWindow);

// ... (Resto de los manejadores de eventos)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});