//Variables
const MAX_TURNS = 4;
var turns = 0;
var crazyButtons = false;
var gamePlay = false;
var solami = false;

var solfegeBank = ['do', 're', 'mi', 'so', 'la'];
var playerInput = [];
var solfege = [];

var oneScore = 0;
var twoScore = 0;
var current = 'Player 1';

//DOM Associations
var oneScoreBox;
var twoScoreBox;
var clickbox;
var startBtn;
var instrBtn;
var gotitBtn;
var buzzer;
var ding;

//Event Listeners
document.addEventListener('DOMContentLoaded', function (e) {
    clickbox = document.getElementById('clickbox');
    oneScoreBox = document.getElementById('player1');
    twoScoreBox = document.getElementById('player2');
    startBtn = document.getElementById('start');
    currentEl = document.getElementById('currentPl');
    buzzer = document.getElementById('buzzer');
    ding = document.getElementById('ding');
    clickAudio = document.getElementById('click');
    instrBtn = document.getElementById('instr button');
    gotitBtn = document.getElementById('gotit');

    //instruction button
    instrBtn.addEventListener('click', function (e) {
        clickAudio.play();
        document.getElementById('instructions').classList.remove('hidden');
    });
    
    //got it!
    gotitBtn.addEventListener('click', function (e) {
        clickAudio.play();
        document.getElementById('instructions').classList.add('hidden');
    });

    //level select 

    //start button - eventually have different level options
    startBtn.addEventListener('click', function (e) {
        if (!gamePlay){
            clickAudio.play();
            resetGame();
            randomNotes();
            playAudio();
            gamePlay = true;
            startBtn.textContent = 'Playing';
            crazyButtons = true;
        };
    });
    
    //playing the game
    clickbox.addEventListener('click', function(e) {
        if (e.target.id !== 'clickbox' && !crazyButtons && gamePlay) {
            clickAudio.play();
            checkSolami();
            playerInput.push(e.target.id);
            checkMatch(playerInput.join(''));
        };
    });
    
});

//Functions

//randomizer for selection of notes
function randomNotes () {
    if (Math.floor((Math.random() * 10) + 1) > 5) {
        let i = 0;
        while (i < 3) {
            var item = solfegeBank[Math.floor(Math.random()*solfegeBank.length)];
            solfege.push(item);
            i++;
        }
        playerInput = [];
    } else {
        solfege = ['so', 'la', 'mi'];
        playerInput = [];
        solami = true;
    }
};

//play selected notes
function playAudio () {
    var i = 0;

    function playTest() {
        if (i < 3) {
            var note = document.getElementById(solfege[i] + '-audio');
            note.pause();
            note.currentTime = 0;
            note.playbackRate = 1.5;
            note.play();
            i++;
        } else {
            clearInterval(handle);
            crazyButtons = false;
            currentEl.textContent = current + " - Go!"
        };
    };

    var handle = setInterval(playTest, 900); 

    if (solami){
        setTimeout(changePlayer, 5000);
    }
}

//check if game is over
function gameOver () {
    if (turns === MAX_TURNS) {
        return true;
    };
    return false;
}

//display winner and disable clicks and enable replay
function endGame () {
    if (oneScore > twoScore) {
        currentEl.textContent = "Player 1 Wins!";
    } else if (twoScore > oneScore) {
        currentEl.textContent = "Player 2 Wins!";
    } else {
        currentEl.textContent = "You tied!";
    }
    gamePlay = false;
    startBtn.textContent = "Play Again";
}

//reset game
function resetGame () {
    current = 'Player 1';
    currentEl.textContent = current;
    oneScore = 0;
    oneScoreBox.textContent = '0';
    twoScore = 0;
    twoScoreBox.textContent = '0';
    playerInput = [];
    solfege = [];
    turns = 0;
    solami = false;
}

//level select
function levelSelect () {
    switch (level) {
        case 4:
            solfegeBank = ['do', 're', 'mi', 'fa', 'so', 'la', 'ti', 'Do'];
            break;
        case 3:
            solfegeBank = ['do', 're', 'mi', 'fa', 'so', 'la', 'Do'];
            break;
        case 2:
            solfegeBank = ['do', 're', 'mi', 'so', 'la'];
            break;
        case 1:
            solfegeBank = ['mi', 'so', 'la'];
            break;
        default:
            solfegeBank = ['mi', 'so', 'la'];
            break;
    }

    for (note of solfegeBank) {
        document.getElementById(note).classList.remove('hidden')
    }
};

//update scores and displays
function updateScores () {
    if (current === 'Player 1') {
        if (solami ? oneScore-- : oneScore++);
        oneScoreBox.textContent = oneScore;
    } else {
        if (solami ? twoScore-- : twoScore++);
        twoScoreBox.textContent = twoScore;
    }
};

//change active player and continue play
function changePlayer () {
    if (solami) {
        ding.play();
        turns++;
        solami = false;
        updateScores();
    }

    if (current === 'Player 1') {
        current = 'Player 2';
        currentEl.textContent = current;
    } else {
        current = 'Player 1';
        currentEl.textContent = current;
    }

    if ( !gameOver() ) {
        solfege = [];
        playerInput = [];
        solami = false;
        randomNotes();
        setTimeout(playAudio, 500);
    } else {
        endGame();
    }
};

//check for a match and change scores
function checkMatch (notes) {
    var answer = solfege.join('');

    if (notes.length === 6) {
        crazyButtons = true;
            if (notes === answer){
                ding.play();
                updateScores();
            } else {
                buzzer.play();
            }
        turns++;
        
        if ( !gameOver() ) {
            solfege = [];
            playerInput = [];
            setTimeout(changePlayer, 1200);
        } else {
            endGame();
        };
    };
};

//if you click anything on solami
function checkSolami () {
    if (!solami) {
        return
    } else {
        buzzer.play();
        turns++;
        updateScores();
        solami = false;
        changePlayer();
    };
};
//add levels of difficulty
//add music for win yaaaay