//Variables
    //turn counter
var playerInput = [];
var computer = 'misola';

//DOM Associations
    //player scores
    //reset button
var clickbox = document.getElementById('clickbox');
    //current player
    //sounds to play

//Event Listeners
    //make sure to do DOMContentLoaded
    //solfege button clicks
    //start/reset clicks
    //hover to play notes, if time
clickbox.addEventListener('click', function(e) {
    if (e.target.id !== 'clickbox') {
        playerInput.push(e.target.id);
        var string = playerInput.join('');
        console.log(string);
        if (string.length === 6) {
            if (string === computer) {
                console.log('match')
            } else {
                console.log('not a match');
            }
            playerInput = [];
        }
    }
});


//Functions
    //randomizer for selection of notes
    //reset game
    //