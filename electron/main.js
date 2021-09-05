const {app, BrowserWindow, Menu, ipcMain, dialog,remote} = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs');


let win

let saving_flag=0

const main_menu = [
    {
        label: 'Файл',
        submenu: [
            {
                role: 'quit',
                label: 'Выход'
            },
            //{ role: 'toggleDevTools' },
            {type: 'separator'},
            {
                label: 'Загрузить проект',
                click: async () => {
                    console.log('[server] Loading project...')
                    let load = load_project()
                    win.webContents.send('load_project', load)
                }
            },
            {
                label: 'Сохранить проект',
                click: async () => {
                    console.log('[server] Saving project...')
                    win.webContents.send('save-project', 'true')
                }
            },
        ]
    },
    {
        label: 'Инфо',
        submenu: [
            {
                label: 'Помощь по работе с программой #1',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://vk.com/new_spaceman')
                }
            },
            {
                label: 'Помощь по работе с программой #2',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://vk.com/id71116600')
                }
            },
            {
                label: 'Обновления и дргие программы',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://shaft.rob-o.technology/')
                }
            },
            {
                label: 'Разработчик',
                click: async () => {
                    const {shell} = require('electron')
                    await shell.openExternal('https://phport.tech?source=shaft')
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
        title: 'Nice Rod V1.2',
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
    win.show()
})

const menu = Menu.buildFromTemplate(main_menu)
Menu.setApplicationMenu(menu)

app.on('window-all-closed', () => {
    app.quit()
})

function load_project(){
    let fileName=dialog.showOpenDialogSync({ properties: ['openFile'] })
    return fs.readFileSync(fileName[0], 'utf-8');
}

ipcMain.on('save-recv', (event, arg) => {
    console.log('save-recv')
        const date = new Date();
        let pref = date.toLocaleDateString();
        pref = pref.replaceAll('.', '_')
        let fileName=dialog.showSaveDialogSync(win,{
            title: 'Сохранить файл проекта',
            defaultPath: 'save_' + pref + '.eeeee',
            buttonLabel:'Сохранить'
        })
        try {
            fs.writeFileSync(fileName, arg, 'utf-8');
            //setTimeout(()=>win.webContents.send('save-reply', 'saved'),500)
        } catch (e) {
            console.log('Failed to save the file !');
            //setTimeout(()=>win.webContents.send('save-reply', 'not saved'),500)
        }
})

ipcMain.on('test-reply', (event, arg) => {
    console.log('test-reply')
})