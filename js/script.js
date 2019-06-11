//Variables
const MAX_TURNS = 6;
var turns = 0;
var gameOver = false;

var solfegeBank = ['do', 're', 'mi', 'so', 'la'];
var playerInput = [];
var solfege = [];

var oneScore = 0;
var twoScore = 0;
var current = 'Player One';

//DOM Associations
var oneScoreBox;
var twoScoreBox;
var clickbox;
var startBtn;
var miAudio;
var soAudio;
var laAudio;
var buzzer;
var ding;

//reset button

//Event Listeners
document.addEventListener('DOMContentLoaded', function (e) {
    clickbox = document.getElementById('clickbox');
    oneScoreBox = document.getElementById('player1');
    twoScoreBox = document.getElementById('player2');
    startBtn = document.getElementById('start');
    currentEl = document.getElementById('currentPl');
    doAudio = document.getElementById('do-audio');
    reAudio = document.getElementById('re-audio');
    miAudio = document.getElementById('mi-audio');
    soAudio = document.getElementById('so-audio');
    laAudio = document.getElementById('la-audio');
    buzzer = document.getElementById('buzzer');
    ding = document.getElementById('ding');
    click = document.getElementById('click');
    
    //start button - eventually have different level options
    startBtn.addEventListener('click', function (e) {
        click.play();
        reset();
        randomNotes();
        playAudio();
        startBtn.disabled = true;
    })
    
    //playing the game
    clickbox.addEventListener('click', function(e) {
        if (e.target.id !== 'clickbox') {
            click.play();
            playerInput.push(e.target.id);
            var playerNotes = playerInput.join('');

            checkMatch(playerNotes);
        }
    });
    
    //reset click
    
});
//hover to play notes, if time?


//Functions

//randomizer for selection of notes
function randomNotes () {
    let i = 0;
    while (i < 3) {
        var item = solfegeBank[Math.floor(Math.random()*solfegeBank.length)];
        solfege.push(item);
        i++;
    }
    playerInput = [];
};

//play selected notes
function playAudio() {
    var i = 0;

    function play() {
        if (solfege[i] === 'mi') {
            miAudio.pause();
            miAudio.currentTime = 0;
            miAudio.playbackRate = 1.5;
            miAudio.play();
            i++;
        } else if (solfege[i] === 'do') {
            doAudio.pause();
            doAudio.currentTime = 0;            
            doAudio.playbackRate = 1.5;
            doAudio.play();
            i++;
        } else if (solfege[i] === 're') {
            reAudio.pause();
            reAudio.currentTime = 0;            
            reAudio.playbackRate = 1.5;
            reAudio.play();
            i++;
        } else if (solfege[i] === 'so') {
            soAudio.pause();
            soAudio.currentTime = 0;            
            soAudio.playbackRate = 1.5;
            soAudio.play();
            i++;
        } else if (solfege[i] === 'la') {
            laAudio.pause();
            laAudio.currentTime = 0;
            laAudio.playbackRate = 1.5;
            laAudio.play();
            i++;
        } else {
            clearInterval(handle);
        }
    };
    
    //any faster interval it skips repeats (or something) three in a row gets first and last played :/
    var handle = setInterval(play, 900); 
}

//check if game is over
function checkGame () {
    if (turns === MAX_TURNS) {
        gameOver = true;
    };
};

function endGame () {
    if (oneScore > twoScore) {
        currentEl.textContent = "Player One Wins!";
    } else if (twoScore > oneScore) {
        currentEl.textContent = "Player Two Wins!";
    } else {
        currentEl.textContent = "You tied!";
    }
    startBtn.disabled = false;
    startBtn.textContent = "Play Again";

}
//reset game
function reset () {
    current = 'Player One';
    currentEl.textContent = current;
    oneScore = 0;
    oneScoreBox.textContent = '0';
    twoScore = 0;
    twoScoreBox.textContent = '0';
    playerInput = [];
    solfege = [];
    turns = 0;
    gameOver = false;
}

//update scores and displays
function updateScores () {
    if (current === 'Player One') {
        oneScore++;
        oneScoreBox.textContent = oneScore;
    } else {
        twoScore++;
        twoScoreBox.textContent = twoScore;
    }
};

//change active player
function changePlayer () {
    if (current === 'Player One') {
        current = 'Player Two';
        currentEl.textContent = current;
    } else {
        current = 'Player One';
        currentEl.textContent = current;
    }
    setTimeout(playAudio, 500);
};

//check for a match and change scores
function checkMatch (notes) {
    var answer = solfege.join('');
    if (notes.length === 6) {
        if (notes === answer){
            ding.play();
            updateScores();
        } else {
            buzzer.play();
        }
        turns++;
        checkGame();
        if (!gameOver) {
            solfege = [];
            playerInput = [];
            randomNotes();
            setTimeout(changePlayer, 1200);
        } else {
            endGame();
        }
    }
};

//add levels of difficulty
//add a replay one time button
//add music for win yaaaay