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
let i = 0

GetAccountData()

searchbar.addEventListener("keypress",(e)=>{
    if(e.key === "Enter")
    {
        GetAccountData()
    }
})

async function GetAccountData()
{
    let res
    if(i === 0)
    {
        res = await window.electronAPI.sendAccData("https://steamcommunity.com/profiles/76561199071734041")
        i += 1
    }
    else
    {
        res = await window.electronAPI.sendAccData(searchbar.value)
    }

    

    console.log(res[3])

    if(res[3] < 1)
    {
        console.log("small")
        totalHrs.innerText = "<1 Hour"
    }
    mainTitle.innerText = `${res[0].nickname}`;
    level.innerText =  `LVL ${res[1]}`
    id.innerText = `Steam ID: ${res[0].steamID}`
    pfp.src = res[0].avatar.large;
    realname.innerText = `Real Name: ${res[0].realName}`
    countrycode.innerText = `Country Code: ${res[0].countryCode}`
    mostPlayedGamesHeader.innerText = "Most Played Games:"

    for(let i = 0; i < mostPlayedGames.length; i++)
    {
        mostPlayedGames[i].src = res[2][i].iconURL
    }


    totalHrs.innerText = `Total Play Time: ${Math.round(res[3])} Hours`
}