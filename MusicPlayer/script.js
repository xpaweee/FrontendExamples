const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['example','example2'];

let songIndex = 0;

//Initially load song details into DOM

loadSong(songs[songIndex]);


//Update song details

function loadSong(song){
    console.log(song);
    title.innerText = song;
    audio.src = `Music/${song}.mp3`;
    cover.src = `Music/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}


function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}


function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}



function nextSong(){
    songIndex++;
    console.log(songIndex);

    if(songIndex > songs.length-1){
        songIndex = 0
    }

    loadSong(songs[songIndex]);

    playSong();
}


function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event listeners

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
});

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const porgressPercent = (currentTime/duration) * 100;
    console.log(porgressPercent);
    progress.style.width = `${porgressPercent}%`;
}
//Change song

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);



//Time / song update

audio.addEventListener('timeupdate',updateProgress);
 
//Cli9ck on progress bar

progressContainer.addEventListener('click', setProgress);


//song ends

audio.addEventListener('ended', nextSong);