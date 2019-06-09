//Variables
var solfegeBank = ['mi', 'so', 'la'];
var playerInput = [];
var solfege = [];
var oneScore = 0;
var scoreTwo = 0;

//DOM Associations
var oneScoreBox;
var twoScoreBox;
var clickbox;
var startBtn;
var currentPl = 'one';
    //reset button
    //sounds to play
    
    //Event Listeners
document.addEventListener('DOMContentLoaded', function (e) {
    clickbox = document.getElementById('clickbox');
    oneScoreBox = document.getElementById('player1');
    twoScoreBox = document.getElementById('player2');
    startBtn = document.getElementById('start');
    currentPl = document.getElementById('currentPl');
    
    startBtn.addEventListener('click', function (e) {
        randomNotes();
        console.log(solfege)
    })
    
    clickbox.addEventListener('click', function(e) {
        if (e.target.id !== 'clickbox') {
            playerInput.push(e.target.id);
            var playerNotes = playerInput.join('');

            checkMatch(playerNotes);
        }
    });

    //reset clicks
    
});
//hover to play notes, if time


//Functions
//randomizer for selection of notes
function randomNotes () {
    let i = 0;
    while (i < 3) {
        var item = solfegeBank[Math.floor(Math.random()*solfegeBank.length)];
        solfege.push(item);
        i++;
    }

}
//game over

//reset game
// function reset

//start game
// function startGame (e) {
    //call randomizer
    //play the sounds
// }

//check for a match and change scores
function checkMatch (notes) {
    var answer = solfege.join('');
    if (notes.length === 6) {
        if (notes === answer){
            console.log('match');
            oneScore++;
            oneScoreBox.textContent = oneScore;
        } else {
            console.log('not a match');
        }
        playerInput = [];
        solfege = [];
    }
};
    