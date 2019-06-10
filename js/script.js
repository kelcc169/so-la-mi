//Variables
var solfegeBank = ['mi', 'so', 'la'];
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
    miAudio = document.getElementById('mi-audio');
    soAudio = document.getElementById('so-audio');
    laAudio = document.getElementById('la-audio');
    buzzer = document.getElementById('buzzer');
    ding = document.getElementById('ding');
    click = document.getElementById('click');
    
    var testAudio = document.getElementById('audio');

    testAudio.addEventListener('click', function (e) {        
    });
    
    //start button - eventually have different level options
    startBtn.addEventListener('click', function (e) {
        currentEl.textContent = current;
        randomNotes();
        setTimeout(playAudio, 1000);
    })
    
    //playing the game
    clickbox.addEventListener('click', function(e) {
        click.play();
        if (e.target.id !== 'clickbox') {
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

function playAudio() {
    var i = 0;

    function play() {
        if (solfege[i] === 'mi') {
            miAudio.pause();
            miAudio.currentTime = 0;
            miAudio.play();
            i++;
        } else if (solfege[i] === 'so') {
            soAudio.pause();
            soAudio.currentTime = 0;
            soAudio.play();
            i++;
        } else if (solfege[i] === 'la') {
            laAudio.pause();
            laAudio.currentTime = 0;
            laAudio.play();
            i++;
        } else {
            clearInterval(handle);
        }
    };
    
    //any faster interval it skips repeats (or something) three in a row gets first and last played :/
    var handle = setInterval(play, 1500); 
}

//game over
//display who the winner is!
//disable clickbox

//reset game
// function reset
    //set current = player one
    //reset scores to 0
    //empty out arrays
//}

//start game
// function startGame (e) {
    //call randomizer
    //play the sounds
// }

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
        setTimeout(changePlayer, 1800);
        solfege = [];
        playerInput = [];
        randomNotes();
        setTimeout(playAudio, 2300);
    }
};