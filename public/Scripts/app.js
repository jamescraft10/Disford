let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

let user = JSON.parse(document.cookie.slice(5));

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
});