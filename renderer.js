const searchbar = document.getElementById("searchbar");
const mainTitle = document.getElementById("mainTitle");
const level = document.getElementById("level")
const id = document.getElementById("id");
const pfp = document.getElementById("pfp");
const realname = document.getElementById("realname");
const countrycode = document.getElementById("countrycode");
const mostPlayedGamesHeader = document.getElementById("mostPlayedGamesHeader");
const mostPlayedGames = [
    document.getElementById("1"),
    document.getElementById("2"),
    document.getElementById("3"),
    document.getElementById("4"),
    document.getElementById("5")
];
const totalHrs = document.getElementById("totalhrs")

for(i = 0; i < document.getElementsByClassName("gameIcon").length; i++)
{
    document.getElementsByClassName("gameIcon")[i].addEventListener("click",(obj)=>{
        console.log(obj.srcElement)
        appid = obj.srcElement.currentSrc.split("/")[7]
        window.electronAPI.openUrl(`https://store.steampowered.com/app/${appid}`)
    })
}

i=0
GetAccountData()

searchbar.addEventListener("keypress",(e)=>{
    if(e.key === "Enter")
    {
        GetAccountData()
    }
})

function GetAccountData()
{
    if(i === 0)
    {
        window.electronAPI.sendProfUrl("https://steamcommunity.com/profiles/76561199071734041/")
    
        window.electronAPI.sendProfData((e,val)=>{
            UpdateUI(val)
        })
        i+=1
    }
    else
    {
        window.electronAPI.sendProfUrl(searchbar.value)
    
        window.electronAPI.sendProfData((e,val)=>{
            UpdateUI(val)
        })
    }

}
function UpdateUI(res)
{
    if(res.totalHoursPlayed < 1)
    {
        console.log("small")
        totalHrs.innerText = "<1 Hour"
    }
    mainTitle.innerText = `${res.steamBasicInfo.nickname}`;
    level.innerText =  `LVL ${res.steamUserLevel}`
    id.innerText = `Steam ID: ${res.steamBasicInfo.steamID}`
    pfp.src = res.steamBasicInfo.avatar.large;
    realname.innerText = `Real Name: ${res.steamBasicInfo.realName}`
    countrycode.innerText = `Country Code: ${res.steamBasicInfo.countryCode}`
    mostPlayedGamesHeader.innerText = "Most Played Games:"

    for(let i = 0; i < mostPlayedGames.length; i++)
    {
        mostPlayedGames[i].src = res.mostPlayedGames[i].iconURL
        // mostPlayedGames[i].href = `https://store.steampowered.com/app/${res.mostPlayedGames[i].appID}`
    }


    totalHrs.innerText = `Total Play Time: ${Math.round(res.totalHoursPlayed)} Hours`
}