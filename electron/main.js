const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs');

let win

const main_menu = [
    {
        label: 'Файл',
        submenu: [
            {
                role: 'quit',
                label: 'Выход'
            },
            { role: 'toggleDevTools' },
            {type: 'separator'},
            {
                label: 'Сохранить проект как...',
                click: async () => {
                    console.log('ass')
                    win.webContents.send('save_project', 'true')
                }
            },
        ]
    },
    {
        label: 'Справка',
        submenu: [
            {
                label: 'Помощь по работе с программой',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://www.south32.com/')
                }
            }
        ]
    }
]

app.disableHardwareAcceleration()
app.whenReady().then(() => {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        useContentSize: true,
        resizable: false,
        maximizable: false,
        title: 'Shaft E-edition',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);
    win.webContents.setFrameRate(60)
    win.once('ready-to-show', () => {
        win.show()
    })
})

const menu = Menu.buildFromTemplate(main_menu)
Menu.setApplicationMenu(menu)

app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.on('asynchronous-message', (event, arg) => {
    try {
        fs.writeFileSync('projectname.eeproj', arg, 'utf-8');
        event.reply('asynchronous-reply', 'saved')
    } catch (e) {
        alert('Failed to save the file !');
        event.reply('asynchronous-reply', 'not saved')
    }
    console.log(arg)
})