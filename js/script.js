//Variables
const MAX_TURNS = 10;
var turns = 0;
var levelNumber = 0;
var crazyButtons = false;
var gamePlay = false;
var solami = false;
var disco = false;

var solfegeBank = [];
var playerInput = [];
var solfege = [];
var handleSoLaMi;
var handleColors;

var oneScore = 0;
var twoScore = 0;
var current = 'Player 1';

//DOM Associations
var oneScoreBox;
var twoScoreBox;
var currentEl;
var clickbox;
var startBtn;
var instrBtn;
var gotitBtn;
var discoBtn;
var discoAudio;
var clickAudio;
var buzzer;
var ding;

//Event Listeners
document.addEventListener('DOMContentLoaded', function (e) {
    oneScoreBox = document.getElementById('player1');
    twoScoreBox = document.getElementById('player2');
    currentEl = document.getElementById('currentPl');
    clickbox = document.getElementById('clickbox');
    startBtn = document.getElementById('start');
    instrBtn = document.getElementById('instr button');
    gotitBtn = document.getElementById('gotit');
    levelBtn = document.getElementById('levels')
    discoBtn = document.getElementById('disco button');
    discoAudio = document.getElementById('ducktales');
    clickAudio = document.getElementById('click');
    buzzer = document.getElementById('buzzer');
    ding = document.getElementById('ding');

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
    levelBtn.addEventListener('click', function (e) {
        if (!gamePlay) {
            clickAudio.play();
            if (levelNumber < 4) {
                levelNumber++;
            } else {
                levelNumber = 1;
            }
            levelBtn.textContent = 'Level ' + levelNumber;
        };
    });

    //disco button
    discoBtn.addEventListener('change', function (e) {
        if (!disco ? disco = true: disco = false);
    });

    //start button - eventually have different level options
    startBtn.addEventListener('click', function (e) {
        if (!gamePlay){
            clickAudio.play();
            gamePlay = true;
            resetGame();
            levelSelect(levelBtn.textContent);
            startDisco();
            randomNotes();
            playAudio();
            startBtn.textContent = 'Playing';
            crazyButtons = true;
        };
    });

    //playing the game
    clickbox.addEventListener('click', function(e) {
        if (e.target.id !== 'clickbox' && !crazyButtons && gamePlay) {
            clickAudio.play();
            playerInput.push(e.target.id);
            checkSolami();
            checkMatch(playerInput.join(''));
        };
    });
});

//Functions
//randomizer for selection of notes
function randomNotes () {
    if (Math.floor((Math.random() * 10) + 1) > 2) {
        let i = 0;
        while (i < 3) {
            var item = solfegeBank[Math.floor(Math.random()*solfegeBank.length)];
            solfege.push(item);
            i++;
        }
    } else {
        solfege = ['so', 'la', 'mi'];
    }
    playerInput = [];
    
    if (solfege.join('') === 'solami'){
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
        handleSoLaMi = setTimeout(changePlayer, Math.floor(Math.random() * 3000) + 4500);
    }
};

//check if game is over
function gameOver () {
    if (turns === MAX_TURNS) {
        return true;
    };
    return false;
};

//display winner and disable clicks and enable replay
function endGame () {
    if (oneScore > twoScore) {
        currentEl.textContent = "Player 1 Wins!";
    } else if (twoScore > oneScore) {
        currentEl.textContent = "Player 2 Wins!";
    } else {
        currentEl.textContent = "You tied!";
    };

    gamePlay = false;
    startBtn.textContent = "Play Again";
    clearInterval(handleColors);
};

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
    level = 0;
    solami = false;
    discoAudio.pause();
    discoAudio.currentTime = 0;
    resetButtons();
    document.querySelector('main').style.backgroundColor = 'darkseagreen';
};

//level select
function levelSelect (level) {
    
    switch (level) {
        case 'Level 4':
            solfegeBank = ['do', 're', 'mi', 'fa', 'so', 'la', 'ti', 'da'];
            break;
        case 'Level 3':
            solfegeBank = ['do', 're', 'mi', 'fa', 'so', 'la', 'da'];
            break;
        case 'Level 2':
            solfegeBank = ['do', 're', 'mi', 'so', 'la'];
            break;
        case 'Level 1':
            solfegeBank = ['mi', 'so', 'la'];
            break;
        default:
            solfegeBank = ['mi', 'so', 'la'];
            break;
    };

    for (let note of solfegeBank) {
        let item = document.createElement('img');
        clickbox.appendChild(item);
        item.setAttribute('src', 'imgs/' + note + '-hand-sign.png');
        item.setAttribute('id', note);
        if (solfegeBank.length > 5)
        item.classList.add('small');
    };
};

//update scores and displays
function updateScores () {
    if (current === 'Player 1') {
        if (solami ? oneScore-- : oneScore++);
        oneScoreBox.textContent = oneScore;
    } else {
        if (solami ? twoScore-- : twoScore++);
        twoScoreBox.textContent = twoScore;
    };
};

//change active player and continue play
function changePlayer () {
    turns++;
    if (solami) {
        ding.play();
        solami = false;
        updateScores();
    };

    if (current === 'Player 1') {
        current = 'Player 2';
        currentEl.textContent = current;
    } else {
        current = 'Player 1';
        currentEl.textContent = current;
    };

    if ( !gameOver() ) {
        solfege = [];
        playerInput = [];
        solami = false;
        randomNotes();
        setTimeout(playAudio, 500);
        if (disco) {
            changeButtons();
            changeColors();
        }
    } else {
        endGame();
    };
};

//if you click any buttons on solami
function checkSolami () {
    if (!solami) {
        return
    } else {
        buzzer.play();
        clearTimeout(handleSoLaMi);
        updateScores();
        solami = false;
        changePlayer();
    };
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

        if ( !gameOver() ) {
            setTimeout(changePlayer, 1200);
        } else {
            endGame();
        };
    };
};

//shuffle the array randomly - thanks Mike and the internet!
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    };
};

//move the buttons around
function changeButtons () {
    let myButtons = document.getElementById('clickbox');
    let shuffleMe = Array.from(myButtons.children);
    
    for (var button of shuffleMe) {
        clickbox.removeChild(button);
    };

    shuffleArray(shuffleMe);

    for (var button of shuffleMe) {
        clickbox.appendChild(button);
    };
};

//reset buttons to original location
function resetButtons () {
    let myButtons = document.getElementById('clickbox');
    let shuffleMe = Array.from(myButtons.children);
    
    for (var button of shuffleMe) {
        clickbox.removeChild(button);
    };
};

//change colors
function changeColors () {
    let i = 0;
    let color = [];

    while (i < 3) {
        var number = Math.floor(Math.random() * 255) + 1;
        color.push(number);
        i++;
    }

    document.querySelector('main').style.backgroundColor = 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
}

//disco protocol
function startDisco () {
    if (!disco) {
        return
    } else {
        discoAudio.volume = 0.5;
        discoAudio.play();
        discoAudio.loop = true;
        handleColors = setInterval(changeColors, 1500);
    }
};