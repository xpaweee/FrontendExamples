const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

//Toggle nav
//klikajacy na body dodaje sie dopisuje sie class='show-nav'
toggle.addEventListener('click', () => document.body.classList.toggle('show-nav'));


//Show modal
//dodanie do elementu modal klasy show-modal
open.addEventListener('click', ()=> modal.classList.add('show-modal'));


//Hide modal
close.addEventListener('click',() => modal.classList.remove('show-modal'));

//Hie modal on outside click
window.addEventListener('click', e => e.target == modal ? modal.classList.remove('show-modal') : false);