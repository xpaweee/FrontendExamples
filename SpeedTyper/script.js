const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of words for mgae


const words = [
    'test',
    'asdfg'
];


//init word

let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

//Start counting down
const timeInterval = setInterval(updateTime,1000);

//Generate random word form array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}


//Add word to DOM


function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display = 'flex';
}

function updateTime(){
    time--;
    timeEl.innerHTML = time +'s';

    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}

function updateScore()
{
    score++;
    scoreEl.innerHTML = score;
}






//Event listeners
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord){
        addWordToDOM();
        updateScore();

        //Clear 
        e.target.value = '';

        if(difficulty === 'hard'){
            time += 2;

        }else if (difficulty === 'medium'){
            time += 3;

        }else if(difficulty === 'easy'){
            time += 5;
        }
        
    }
})

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));


settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})

addWordToDOM();

//Focus on text on start
text.focus();