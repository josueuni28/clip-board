const { ipcMain, clipboard } = require('electron')

ipcMain.on('process-character-copy', (event, dados) => {
    if(dados.length > 0){
        clipboard.writeText(dados)
        event.reply('process-character-copy-reply', 'copiado')
    }else{
        event.reply('process-character-copy-reply', 'eNull')
    }
})