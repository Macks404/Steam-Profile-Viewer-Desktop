const searchbar = document.getElementById("searchbar");
const mainTitle = document.getElementById("mainTitle");
const level = document.getElementById("level")
const id = document.getElementById("id");
const pfp = document.getElementById("pfp");
const realname = document.getElementById("realname");
const countrycode = document.getElementById("countrycode");
const mostPlayedGamesHeader = document.getElementById("mostPlayedGamesHeader");
const mostPlayedGames = [
    document.getElementById("game1"),
    document.getElementById("game2"),
    document.getElementById("game3"),
    document.getElementById("game4"),
    document.getElementById("game5")
];
const totalHrs = document.getElementById("totalhrs")

i=0
GetAccountData()

searchbar.addEventListener("keypress",(e)=>{
    if(e.key === "Enter")
    {
        console.log("enter heard")
        GetAccountData()
    }
})

function GetAccountData()
{
    if(i === 0)
    {
        console.log("Get account data called")
        window.electronAPI.sendProfUrl("https://steamcommunity.com/profiles/76561199071734041/")
        console.log("Url Sent")
    
        window.electronAPI.sendProfData((e,val)=>{
            console.log("Send Prof Data :D")
            UpdateUI(val)
        })
        i+=1
    }
    else
    {
        console.log("Get account data called")
        window.electronAPI.sendProfUrl(searchbar.value)
        console.log("Url Sent")
    
        window.electronAPI.sendProfData((e,val)=>{
            console.log("Send Prof Data :D")
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
    }


    totalHrs.innerText = `Total Play Time: ${Math.round(res.totalHoursPlayed)} Hours`
}