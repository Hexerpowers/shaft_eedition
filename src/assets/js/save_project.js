const ipcRenderer = window.require('electron').ipcRenderer;

ipcRenderer.on('save_project', (event, message) => {
    console.log(message)
    ipcRenderer.send('asynchronous-message', 'ping228')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg)
})