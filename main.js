require("dotenv").config()

const {app, BrowserWindow, ipcMain} = require("electron");
const steamapi = require("steamapi");
const steam = new steamapi(process.env.KEY);
const path = require("path");

function InitWindow()
{
    const win = new BrowserWindow({
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
    ipcMain.handle("send-acc-data", GetAccountData)
})

async function GetAccountData(thing,url)
{
    steamID = await steam.resolve(url)
    steamBasicInfo = await steam.getUserSummary(steamID)
    steamUserLevel = await steam.getUserLevel(steamID)
    steamGames = await steam.getUserOwnedGames(steamID)
    
    let mostPlayedGames
    let totalMinsPlayed = 0
    let totalHoursPlayed = 0

    if(steamGames.length <= 5)
    {
        mostPlayedGames = new Array(steamGames.length)
    }
    else
    {
        mostPlayedGames = new Array(5)
    }

    for(let e = 0; e < mostPlayedGames.length; e++)
    {
        for(let i = 0; i < steamGames.length; i++)
        {
            if(e == 0)
            {
                totalMinsPlayed += steamGames[i].playTime
            }
            for(let k = 0; k < mostPlayedGames.length; k++)
            {
                if(mostPlayedGames[k] === undefined)
                {
                    mostPlayedGames[k] = steamGames[i]
                }
                else if(steamGames[i].playTime > mostPlayedGames[k].playTime && !mostPlayedGames.includes(steamGames[i]))
                {
                    mostPlayedGames[k] = steamGames[i]
                }
            }
        }
    }
    totalHoursPlayed = totalMinsPlayed / 60
    
    return [steamBasicInfo,steamUserLevel, mostPlayedGames, totalHoursPlayed]
}