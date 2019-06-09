//Variables
var playerInput = [];
var solfege = 'misola';

//DOM Associations
var scoreOne;
var scoreTwo;
    //reset button
    //current player
    //sounds to play
    
    //Event Listeners
document.addEventListener('DOMContentLoaded', function (e) {
    var clickbox = document.getElementById('clickbox');
    var scoreOne = document.getElementById('player1');
    var scoreTwo = document.getElementById('player2');
    
    clickbox.addEventListener('click', function(e) {
        if (e.target.id !== 'clickbox') {
            playerInput.push(e.target.id);
            var playerNotes = playerInput.join('');
            
            checkMatch(playerNotes);
        }
    });
});
//start/reset clicks
//hover to play notes, if time


//Functions
//randomizer for selection of notes
//reset game
function checkMatch (notes) {
    if (notes.length === 6) {
        if (notes === solfege) {
            console.log('match')
        } else {
            console.log('not a match');
        }
        playerInput = [];
    }
}
    