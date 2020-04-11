const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


const data = [
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Thirsty"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Happy"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Hungry"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },
    {
        image:'https://st.depositphotos.com/1008939/3281/i/950/depositphotos_32814173-stock-photo-angry-shouting-man.jpg',
        text: "I'm Scared"
    },

];

data.forEach(createBox);


//Create speech boxes
function createBox(item){
    const box = document.createElement('div');

    const{ image, text} = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt"${text}"/>
        <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'),800);
    });
    main.appendChild(box);
}


//Store voices
let voices = [];


//Init speech synth
const message = new SpeechSynthesisUtterance();


function getVoices(){
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `
        ${voice.name} ${voice.lang}
        `;

        voicesSelect.appendChild(option);
    });
}

//Set text

function setTextMessage(text){
    message.text = text;
}

//Speak text

function speakText(){
    speechSynthesis.speak(message);
}

function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value);
}

//Voices changed
speechSynthesis.addEventListener('voiceschanged',getVoices);

//Toggle text box

toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

//Close button

closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

//Change voice
voicesSelect.addEventListener('change', setVoice);

//Read text button

readBtn.addEventListener('click', () => {
    setTextMessage(textArea.value);
    speakText();
});

getVoices();