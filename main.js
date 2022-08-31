const {app, BrowserWindow, ipcMain, shell} = require("electron");
const path = require("path");
const fetch = require("node-fetch")

let win

function InitWindow()
{
    win = new BrowserWindow({
        width:475,
        height:635,
        resizable:false,
        autoHideMenuBar: false,
        webPreferences:{
            preload: path.join(__dirname,"preload.js"),
        },
    })
    win.loadFile("./index.html")
}

app.whenReady().then(async ()=>{
    InitWindow();
    ipcMain.handle("send-prof-url", GetAccountData)
    ipcMain.handle("open-url", openUrl)
})

function openUrl(stuff, url)
{
   shell.openExternal(url) 
}
async function GetAccountData(stuff,url)
{
    // const res = await fetch(`https://spv-native-backend.herokuapp.com/spvn/data?steamprof=${url}`)
    const res = await fetch(`http://localhost:3000/spvn/data?steamprof=${url}`)
    const data = await res.json()

    SendAccountData(data)
}

async function SendAccountData(data)
{
    win.webContents.send("send-prof-data",data)
    console.log("Sent Profile Data To Frontend")
}
