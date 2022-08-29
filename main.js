const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const fetch = require("node-fetch")

let win

function InitWindow()
{
    win = new BrowserWindow({
        width:475,
        height:635,
        resizable:false,
        autoHideMenuBar: true,
        webPreferences:{
            preload: path.join(__dirname,"preload.js"),
        },
    })
    win.loadFile("./public/index.html")
}

app.whenReady().then(()=>{
    InitWindow();
    ipcMain.handle("send-prof-url", GetAccountData)
})

async function GetAccountData(stuff,url)
{
    const res = await fetch(`https://spv-native-backend.herokuapp.com/spvn/data?steamprof=${url}`)
    const data = await res.json()

    SendAccountData(data)
}

async function SendAccountData(data)
{
    win.webContents.send("send-prof-data",data)
    console.log("Sent Profile Data To Frontend")
}
