const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const cors = require("cors")
const express = require("express")
const appE = express()
const fetch = require("node-fetch")

appE.use(express.json())
appE.use(cors())

let win

const sessionID = Math.round(Math.floor(Math.random() * 1000000) / Math.floor(Math.random()*100))

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
    ipcMain.handle("send-prof-url", SendProfileURL)
})

async function SendProfileURL(stuff,url)
{   
    const options = {
        method: "POST",
        body: JSON.stringify({
            sessionID,
            url,
        }),
        headers:{
            "Content-Type":"application/json"
        }
    }
    //send the url
    fetch("http://localhost:3000/spvn/url",options)
    console.log("Sent URL Data")
}
async function SendAccountData(data)
{
    win.webContents.send("send-prof-data",data)
    console.log("Sent Profile Data To Frontend")
}

appE.post("/spvn/data",async (req,res)=>{
    console.log("Received Session ID Data:",req.body.sessionID)
    if(req.body.sessionID == sessionID)
    {
        console.log("The session ID matches, this is my data!")
        SendAccountData(req.body.data)
    }
})
appE.listen(3001,()=>{
    console.log("Listening On Port 3001...")
})