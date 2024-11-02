const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Initialize electron store
// This creates a JSON file in the app's user data directory:
// - Windows: C:\Users\<username>\AppData\Roaming\electron-notes-app\config.json

const store = new Store({
    name: 'notes-db', // This will create notes-db.json
    defaults: {
        notes: []
    }
});

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false, 
        backgroundColor: '#ffffff'
    });

    mainWindow.loadFile('index.html');

    // Show window when ready to prevent flickering
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for saving and loading notes
ipcMain.handle('save-note', async (event, note) => {
    const notes = store.get('notes', []);
    if (note.id) {
        // Update existing note
        const index = notes.findIndex(n => n.id === note.id);
        if (index !== -1) {
            notes[index] = note;
        }
    } else {
        // Add new note
        note.id = Date.now();
        notes.push(note);
    }
    store.set('notes', notes);
    return notes;
});

ipcMain.handle('load-notes', async () => {
    return store.get('notes', []);
});