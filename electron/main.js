const {app, BrowserWindow, Menu} = require('electron')
const path = require ('path');
const url = require ('url');
const main_menu = [
    {
        label: 'Файл',
        submenu: [
            {
                role: 'quit',
                label: 'Выход'
            },
            { type: 'separator' },
            {
                label: 'Сохранить проект как...',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://www.south32.com/')
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
                    const { shell } = require('electron')
                    await shell.openExternal('https://rob-o.technology')
                }
            }
        ]
    }
]

app.disableHardwareAcceleration()
app.whenReady().then(() => {
    createWindow()
})

const menu = Menu.buildFromTemplate(main_menu)
Menu.setApplicationMenu(menu)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function createWindow () {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        useContentSize: true,
        resizable: false,
        maximizable: false,
        title: 'Shaft E-edition',
        nodeIntegration: true
    })
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    });
    win.loadURL(startUrl);
    win.once('ready-to-show', () => {win.show()})
    win.webContents.setFrameRate(60)
}