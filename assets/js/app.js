
window.onload = activateAnimation();

const body = document.querySelector("body");
const main = document.querySelector("#main-content");
const quitGame = document.querySelector("#quit-game");
const endCaption = document.querySelector("#end-caption");
const retryBtn = document.querySelector("#retry-btn");
const thirdDesc = document.querySelector("#desc3");
const resultsContainer = document.querySelector("#results-container");
let buttons = document.querySelectorAll(".button");


let computerSelection;
let playerSelection;
let computerScore = 0;
let playerScore = 0;

//EVENT LISTENERS

body.addEventListener('click', skipAnime());
body.addEventListener('keydown', skipAnime());

//FUNCTIONS

function skipAnime() {
    const span = document.querySelectorAll('span');
    span.forEach((span) => span.classList.add('skip'));
}

function activateAnimation(){
    fadeIn();
    const firstDesc = document.querySelector('#desc1');
    let firstDescSpan = firstDesc.querySelectorAll('span');

    firstDescSpan = Array.from(firstDescSpan);

    const secondDesc = document.querySelector('#desc2');
    const thirdDesc = document.querySelector('#desc3');

    firstDescSpan[firstDescSpan.length - 1].ontransitionend = () => {
        firstDesc.classList.add('fade-out');

        firstDesc.addEventListener('animationend', () => {
            firstDesc.classList.add('hide');
            firstDesc.classList.remove('animate');
            secondDesc.classList.remove('hide');
            secondDesc.classList.add('animate');
            fadeIn();

            let secondDescSpan = secondDesc.querySelectorAll('span');
            secondDescSpan = Array.from(secondDescSpan);

            secondDescSpan[secondDescSpan.length - 1].ontransitionend = () => {
                secondDesc.classList.add('fade-out');
                secondDesc.addEventListener('animationend', () => {
                    secondDesc.classList.add('hide');
                    secondDesc.classList.remove('animate');
                    thirdDesc.classList.remove('hide');
                    thirdDesc.classList.add('animate');
                    fadeIn();

                    let thirdDescSpan = thirdDesc.querySelectorAll('span');
                    thirdDescSpan = Array.from(thirdDescSpan);

                    thirdDescSpan[thirdDescSpan.length - 1].ontransitionend = () => {
                        const callToAction = document.querySelector('#cta');
                        callToAction.classList.add('drop-down');

                        callToAction.addEventListener('animationend', () => {
                            const gameContainer = document.querySelector('#game-container');

                            setTimeout(function(){
                                gameContainer.classList.add('fade-in');
                            },300);
                        }

                        );
                    }
                })

            }
        })
    }
}

function fadeIn(){
    let animateText = document.querySelector('.animate');

    let rawAnimateText = animateText.textContent;
    let splitRawAnimateText = rawAnimateText.split("");
    animateText.textContent = "";

    for(let i = 0; i < splitRawAnimateText.length; i++){
        animateText.innerHTML += `<span>${splitRawAnimateText[i]}</span>`;
    }

    let char = 0;
    let timer = setInterval(onTick, 50);

    function onTick(){
        const allSpan = animateText.querySelectorAll('span')[char];
        allSpan.classList.add('fade');
        char++;

        if(char === splitRawAnimateText.length){
            complete();
            return;
        }
    }

    function complete(){
        clearInterval(timer);
        timer = null;
    }
}

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedImg = button.querySelector('img');
        playerSelection = selectedImg.alt.toLowerCase();

        playRound(playerSelection, computerSelection);

        if(playerScore === 5 || computerScore === 5){
            declareWinner();
        }
    })
})


const gameOptions = ['Rock', 'Paper', 'Scissors'];

function computerTurn(){
    return gameOptions[~~(Math.random() * gameOptions.length)];
}

function playRound(playerSelection, computerSelection){
    computerSelection = computerTurn().toLowerCase();
    playerSelection = playerSelection.toLowerCase();
    if(computerSelection == playerSelection){
        displayResults(`Oops it's a TIE! You selected ${capitalize(playerSelection)} and computer selected ${capitalize(computerSelection)}. `);
    }else if(
        (computerSelection == 'rock' && playerSelection == 'scissors') || 
        (computerSelection == 'scissors' && playerSelection == 'paper') ||
        (computerSelection == 'paper' && playerSelection == 'rock')
    ){
        computerScore = ++computerScore;
        keepComputerScore();
        if(computerScore === 1){
            displayResults(`Oh no! You lost this round. ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}.`)
        }else if (computerScore === 2){
            displayResults(`Arghh. You lost another round. ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}. Try another round. You got this!!`);
        }else if(computerScore === 4){
            displayResults(`Sigh! It's another point for Computer. ${capitalize(computerSelection)} beats ${capitalize(playerSelection)}..Don't give up yet!`);
        }else{
            displayResults(`${capitalize(computerSelection)} beats ${capitalize(playerSelection)}`);
        }
    }else{
        playerScore = ++playerScore;
        keepPlayerScore();
        if(playerScore === 1){
            displayResults(`Let's go, you won this round. ${capitalize(playerSelection)} beats ${computerSelection}.`);
        }else if(playerScore === 2){
            displayResults(`You win another point!. ${capitalize(playerSelection)} beats ${computerSelection}.`);
        }else if (playerScore === 3) {
            displayResults(`${capitalize(playerSelection)} beats ${computerSelection}! You're on a roll!!!`);
          }else if (playerScore === 4) {
            displayResults(`${capitalize(playerSelection)} beats ${computerSelection}. One more and you're a hero!`);
          }else{
            displayResults(`${playerSelection} beats ${computerSelection}`);
          }
    }
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayResults(str){
    resultsContainer.animate([{opacity: 0}, {opacity: 1}],{
        duration: 300,
        fill: 'forwards',
        iterations: 1,
        delay: 0,
        easing: 'ease-out'
    });
    resultsContainer.textContent = str;
}

function declareWinner(){
    rplContent();
    if(playerScore > computerScore){
        endCaption.textContent = "You win! Thank you for playing.";
        retryBtn.innerText = 'Start a new game?';
    }
    fadeIn();

    let endCaptionSpan = endCaption.querySelectorAll('span');
    endCaptionSpan = Array.from(endCaptionSpan);

    endCaptionSpan[endCaptionSpan.length - 1].ontransitionend = () => {
        retryBtn.classList.add('fade-in');
    };
}

function rplContent(){
    main.classList.add('hide');
    quitGame.classList.remove('hide');
    thirdDesc.classList.remove('animate');
    endCaption.classList.add('animate');

    retryBtn.addEventListener('click', () => {
        main.classList.remove('hide');
        quitGame.classList.add('hide');
        thirdDesc.classList.add('animate');
        retryBtn.classList.remove('fade-in');
        resetGame();
    })
}

function resetGame(){
    fadeIn();
    resultsContainer.textContent = "";
    playerScore = 0;
    computerScore = o;
    keepPlayerScore();
    keepComputerScore();
}

function keepPlayerScore(){
    let playerScoreBox = document.querySelector('#player-score');

    playerScoreBox.animate([{opacity: 0}, {opacity: 1}],{
        duration: 300,
        fill: 'forwards',
        iterations: 1,
        delay: 0,
        easing: 'ease-out'
    });


    playerScoreBox.textContent = playerScore;
}

function keepComputerScore(){
    let computerScoreBox = document.querySelector('#computer-score');

    computerScoreBox.animate([{opacity: 0}, {opacity:1}],{
        duration: 300,
        fill: 'forwards',
        iterations: 1,
        delay: 0,
        easing: 'ease-out'
    });

    computerScoreBox.textContent = computerScore;
}