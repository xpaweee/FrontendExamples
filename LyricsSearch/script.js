const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiUrl ='https://api.lyrics.ovh';


async function searchSongs(term){
    // fetch(`${apiUrl}/suggest/${term}`)
    //     .then(res => res.json())
    //     .then(data => console.log(data));

    const res = await fetch(`${apiUrl}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}


// Get prev and next songs
async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

async function getLyrics(artist, songTitle){

    console.log(artist);
    console.log(songTitle);
    const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle} </h2>
        <span>${lyrics}</span>
    `;
    more.innerHTML = '';
}


//Show song in dom

function showData(data){

    let output = '';

    data.data.forEach(element => {
        output += `
        <li>
            <span><strong>${element.artist.name}</strong> - ${element.title}</span>
            <button class="btn" data-artist="${element.artist.name}" data-songtitle = "${element.title}"> Get Lyrics</button>
        </li>
        `
    });

    result.innerHTML = `
        <ul class="songs">
            ${output}
        </ul>
    `;


    // result.innerHTML = `
    //     <ul class="songs>
    //         ${data.data.map(element => `
    //         <li>
    //             <span><strong>${element.artist.name}</strong> - ${element.title}</span>
    //             <button class="btn data-artist="${element.artist.name}" data-songtitle = "${element.title}"> Get Lyrics</button>
    //         </li>
    //         `).join('')}
    //     </ul>
    // `;
    console.log(data);
    if(data.prev || data.next){
        more.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        `;
    }
    else{
        more.innerHTML = '';
    }
}


//Get lyrics button click

result.addEventListener('click', e => {
    const clickedEl = e.target;

    if(clickedEl.tagName === 'BUTTON')
    {
        const artits = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');

        getLyrics(artits, songTitle);
    }
});



//Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();
    if(!searchTerm){
        alert('Please type in a serach term')
    }
    else
    {
        searchSongs(searchTerm);
    }
});