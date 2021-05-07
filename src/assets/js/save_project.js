const ipcRenderer = window.require('electron').ipcRenderer;

ipcRenderer.on('save_project', (event, message) => {
    console.log(message)
    ipcRenderer.send('asynchronous-message', 'ping2282')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg)
})