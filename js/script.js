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

    //reset button
    //sounds to play
    
    //Event Listeners
document.addEventListener('DOMContentLoaded', function (e) {
    clickbox = document.getElementById('clickbox');
    oneScoreBox = document.getElementById('player1');
    twoScoreBox = document.getElementById('player2');
    startBtn = document.getElementById('start');
    currentEl = document.getElementById('currentPl');
    
    var testAudio = document.getElementById('audio');

    testAudio.addEventListener('click', function (e) {

    });
    
    //start button - eventually have different level options
    startBtn.addEventListener('click', function (e) {
        randomNotes();
        //play first random notes array to start game
        console.log(solfege)
    })
    
    //playing the game
    clickbox.addEventListener('click', function(e) {
        if (e.target.id !== 'clickbox') {
            playerInput.push(e.target.id);
            var playerNotes = playerInput.join('');

            checkMatch(playerNotes);
            changePlayer();
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

};

//game over
    //display who the winner is!
    //disable clickbox

//reset game
// function reset
    //set current = player one
    //reset scores to 0
    //empty out arrays

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
            updateScores();
        } else {
            console.log('not a match');
        }
        playerInput = [];
        solfege = [];
    }
};