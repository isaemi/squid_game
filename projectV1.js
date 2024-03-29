function Drawbots() {
    let bots = document.querySelector("#bots");
    let computer = `<circle class="anemiesalive" cx="500" cy="250" r="5" fill="black" />`;
    for (let i = 0; i < 50; i++){
        computer += `<circle class="anemiesalive" cx="500" cy="${Math.random() * 500}" r="5" fill="black" />`;
    }
    bots.innerHTML = computer;
}

function init() {
    let player = document.querySelector("#player");
    player.setAttribute("cx", "500");
    player.setAttribute("cy", "250");
    Drawbots();
    let output = document.querySelector("#output");
    output.innerHTML = "";
    player.setAttribute("class", "player");
    player.setAttribute("fill", "blue");
}

function processGame(e){
    let player = document.querySelector("#player");
    let bots = document.querySelectorAll(".anemiesalive");
    let output = document.querySelector("#output");

    // Check if the player's class contains "player"
    if(player.getAttribute("class").includes("player")) {
        let cx = Number(player.getAttribute("cx"));
        let cy = Number(player.getAttribute("cy"));
        let mouseXposition = e.clientX - 10;
        let mouseYposition = e.clientY - 80;

        player.setAttribute("cx", mouseXposition);
        player.setAttribute("cy", mouseYposition);
        player.classList.add("animated-svg");

        if((cx - mouseXposition) > 40) {
            player.setAttribute("fill", "red");
            player.setAttribute("class", "playerdead");
            output.innerHTML = "You Were Shot";
        }

        for(let i = 0; i < bots.length; i++) {
            let x = Number(bots[i].getAttribute("cx"));
            let y = Number(bots[i].getAttribute("cy"));
            let randomX = (Math.random() * 43);
            let randomY = (Math.random() * 43) - 20;
            bots[i].setAttribute("cx", x - randomX)
            bots[i].setAttribute("cy", y - randomY)

            bots[i].classList.add("animated-svg");

            if((randomX) > 40){
                bots[i].setAttribute("fill", "red");
                bots[i].setAttribute("class", "anemiesdead");
            }
        }

        if(player.getAttribute("cx") < 100 && player.getAttribute("class").includes("player")){
            player.setAttribute("class", "playerdead");
            player.setAttribute("fill", "green");
            output.innerHTML = "You Win";
        }

        for (let i = 0; i < bots.length; i++){
            if(bots[i].getAttribute("cx") < 100){
                player.setAttribute("class", "playerdead");
                bots[i].setAttribute("fill", "green");
                i = bots.length;
                output.innerHTML = "You Lost";
                break;
            }
        }
    }    
}
