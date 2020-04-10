const postsContainer = document.getElementById('post-container');

const loading = document.querySelector('.loader');

const filter = document.getElementById('filter');

let limit = 13;
let page = 1;


//Fetch posts from API
async function getPosts(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);


    const data = await res.json();

    return data;
}


//Show psts in dom

async function showPosts(){
    const posts = await getPosts();
    posts.forEach(element => {
       const postEl = document.createElement('div');
       postEl.classList.add('post');
       postEl.innerHTML = `
       <div class="number">${element.id}</div>
       <div class="post-info">
            <h2 class="post-title">${element.title}</h2>
            <p class="post-body">${element.body}</p>
       </div>
       
       `; 

       postsContainer.appendChild(postEl);
    });
}

//Show loader and fetch more posts

function showLoading(){
    loading.classList.add('show');

    setTimeout(() => {loading.classList.remove('show');},1000);
    setTimeout(() => {
        page++;
        showPosts();
    },300);
}

//Filter post by input

function filterPosts(e){
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) > - 1 || body.indexOf(term) > -1){
            post.style.display = 'flex';
        }else{
            post.style.display = 'none';
        }
    });

}


showPosts();


window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight - 5){
        console.log(123);
        showLoading();
    }
});


filter.addEventListener('input', filterPosts);