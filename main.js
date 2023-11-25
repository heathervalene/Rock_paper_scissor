//Identify and initialize state variables.
//Code the main render(), renderScores() & renderResults() functions.
//Code the click event listener, including the win logic.
//Update the renderResults() function to render the winner border.
//Code the countdown timer


/*----- constants -----*/
const AUDIO = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');
const RPS_lOOKUP = {
    r: { img: '/images/rock.png', beats: 's'},
    p: { img: '/images/paper.png', beats: 'r'},
    s: { img: '/images/scissor.png', beats: 'p'}
};

/*----- app's state (variables) -----*/

let scores; // object 'p' = player score, 't' = tie, 'c'= computer score

let results; // object keys: 'p' player result, 'c' computer results
            // values of: 'r' = rock , 'p' = paper , 's' = scissors

let winner; // string of 'p' = player wins, 't' = tie, 'c'= computer wins



/*----- cached element references -----*/

const PresultEL = document.getElementById('p-result');
const CresultEL = document.getElementById('c-result');
const CountdownEL = document.getElementById( 'countdown');


/*----- event listeners -----*/

//use event delegation to listen to any number of elements, instead of writing a sep. event listener per element

document.querySelector('main')
.addEventListener('click', handleChoice);


/*----- functions -----*/
init();

//initialize all state and call render();
function init() {
scores = {
    p: 0,
    t: 0,
    c: 0,
    };
    results = {
p: 'r',
c: 'r',
    };
    winner = 't'; //starting tie since both player and computer both initialize with rock
render();
}

//track when the player clicked on which button to update the impacted state and call render()
function handleChoice (evt) {
// guard to ensure function runs only on buttons and not any element in the main tag
if(evt.target.tagName !== 'BUTTON') return;
//player has made a choice 
results.p = evt.target.innerText.toLowerCase();
//computer has made a choice
results.c = getRandomRPS();
winner = getWinner();
//update the scores
scores[winner] += 1;
render();
};

//generata a random choice by computer
function getRandomRPS() {
    const rps = Object.keys(RPS_lOOKUP);
    const rndIdx = Math.floor(Math.random() * rps.length);
    return rps[rndIdx];
}

//return a winner  or tie based on player and computer choice
function getWinner () {
if (results.p === results.c) return 't';
//look for what the player has choosen in the object and what it beats
return RPS_lOOKUP[results.p].beats === results.c ? 'p' : 'c';
}


//render functions//
//transfer or vizualize all state to the DOM based on the above functions running
function renderScores(){

    //for in loop to loop through keys of score object
 for (let key in scores) {
    //name the score IDs to a variable using template literal to call all 3 keys
    const scoreEl = document.getElementById(`${key}-score`);
    //change the text of the initial scores to the values in the key (starts at 0)
    scoreEl.innerText = scores[key];
 }

};

function renderResults(){
    //render the initial image results(in RPS_LOOKUP) found in the results object- looking for the value of each key
PresultEL.src = RPS_lOOKUP[results.p].img;
CresultEL.src = RPS_lOOKUP[results.c].img;
PresultEL.style.borderColor = winner === 'p' ? 'grey' : 'white'
CresultEL.style.borderColor = winner === 'c' ? 'grey' : 'white'
};


function render() {
    renderCountdown(function() {
        renderScores();
        renderResults(); 
    });
}

function renderCountdown (cb) {
 let count = 3;
 AUDIO.currentTime = 0;
 //AUDIO.play();
 CountdownEL.style.visibility = 'visible';
CountdownEL.innerText = count;
const timerId = setInterval(function() {
    count--;
    if (count) {
        CountdownEL.innerText = count;
    } else {
        clearInterval(timerId);
        CountdownEL.style.visibility = 'hidden';
        cb();
    }
}, 1000);
}