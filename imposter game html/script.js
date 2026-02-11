const mat = document.getElementById("mat");
const länder = document.getElementById("länder");
const platser = document.getElementById("platser");
const filmer = document.getElementById("filmer");

const playerAmount = document.getElementById("players");    
const imposterAmount = document.getElementById("imposters");

mat.addEventListener("click", (event) => {
    toggleClass(event);
})
länder.addEventListener("click", (event) => {
    toggleClass(event);
})
platser.addEventListener("click", (event) => {
    toggleClass(event);
})
filmer.addEventListener("click", (event) => {
    toggleClass(event);
})

function toggleClass(event) {
    if(event.currentTarget.classList.contains("on")) {
        event.currentTarget.classList.remove("on");
    } else {
        event.currentTarget.classList.add("on");
    }
}

let imposter;
let players;

let categories = [];

const startGame = document.getElementById("startGame");

function amountPlayers(Divs, amount) {
    for(let i = 0; i < Divs.length; i++) {
        if (i >= amount) {
            Divs[i].style.display = "none";
        } else {
            Divs[i].style.display = "block";
        }
    }
}

async function getCategorie() {
    try {
        const response = await fetch("categories.json");
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Kunde inte ladda kategorier:", error);
    }
}

function randomImposter(imps, Players) {
    let imposters = [];
    for(let i = 0; i < imps; i++) {
        imposters.push(Math.floor(Math.random() * Players) + 1);
    }
    return imposters;

}

let Name;
let Hint;

let chosenImp
let chosedCategorieName

const playerDivs = document.querySelectorAll(".player");

startGame.addEventListener("click", async () => {
    imposter = imposterAmount.value;
    players = playerAmount.value;

    if(mat.classList.contains("on")) {
        categories.push("mat");
    }
    if(länder.classList.contains("on")) {
        categories.push("länder");
    }
    if(platser.classList.contains("on")) {
        categories.push("platser");
    }
    if(filmer.classList.contains("on")) {
        categories.push("filmer");
    }

    if(categories.length < 1) {
        alert("Minst en kategori måste väljas");
        return;
    }  
    
    const setup = document.getElementById("setup");
    const game = document.getElementById("game");

    setup.style.display = "none";
    game.style.display = "block";

    switch(players) {
        case "3":
            amountPlayers(playerDivs, 3);
            break;
        case "4":
            amountPlayers(playerDivs, 4);
            break;
        case "5":
            amountPlayers(playerDivs, 5);
            break;  
        case "6":
            amountPlayers(playerDivs, 6);
            break;  
        case "7":
            amountPlayers(playerDivs, 7);
            break;
        case "8":
            amountPlayers(playerDivs, 8);
            break;
        case "9":
            amountPlayers(playerDivs, 9);
            break;    
        case "10":
            amountPlayers(playerDivs, 10);
            break;    
        }

    const data = await getCategorie();
    const categoriesObject = data.categories; 

    
    chosedCategorieName = categories[Math.floor(Math.random() * categories.length)];
    console.log("Vald kategori:", chosedCategorieName);

    
    const categoryList = categoriesObject[chosedCategorieName];


    const randomSelection = categoryList[Math.floor(Math.random() * categoryList.length)];

    console.log("Namn:", randomSelection.name);
    console.log("Hint:", randomSelection.hint);

    Hint = randomSelection.hint;
    Name = randomSelection.name;

    chosenImp = randomImposter(imposter, players)
    console.log(chosenImp[0]);
});

const categorieRound = document.getElementById("categorieRound");
const roleRound = document.getElementById("roleRound");
const hintRound = document.getElementById("hintRound");
const playerInfo = document.getElementById("playerInfo");

const nextButton = document.getElementById("next");

playerDivs.forEach(div => {
    div.addEventListener("click", () => {
        if(div.dataset.done === "1") {
            return;
        }
        console.log(div.dataset.player);
        if(div.dataset.player === String(chosenImp[0])) {
            roleRound.textContent = "Du är en Imposter!";
            categorieRound.textContent = `Kategori: ${chosedCategorieName}`;
            hintRound.textContent = `Ledtråd: ${Hint}`;
        } else {
            roleRound.textContent = `Ord: ${Name}`;
            categorieRound.textContent = `Kategori: ${chosedCategorieName}`;
            hintRound.textContent = "";
        }
        playerInfo.style.display = "block";
        div.dataset.done = "1";
        for(let i = 0; i < playerDivs.length; i++) {
            if(playerDivs[i].dataset.done === "1") {
                playerDivs[i].style.backgroundColor = "grey";
            }
        }
    })
})

nextButton.addEventListener("click", () => {
    playerInfo.style.display = "none";

    let allDone = false;
    for(let i = 0; i < playerDivs.length; i++) {
        if(playerDivs[i].dataset.done === "1" ||  playerDivs[i].style.display === "none") {
            allDone = true;
        } else {
            allDone = false;
            break;
        }
    }
    if(allDone) {
        alert(`Alla spelare har fått sina roller! Spelaren som börjar är spelare ${Math.floor(Math.random() * players) + 1}`);
    }
});
