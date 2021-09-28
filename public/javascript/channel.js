const socket = io(); 
let form = document.getElementById('form');
let input = document.getElementById('input');
let messages = document.getElementById('messages');
let hiddenUsername = document.getElementById('username');

const username = hiddenUsername.textContent;

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('p');
    item.textContent = `${username}: ${msg}`;
    messages.appendChild(item);
    console.log('message: '+ msg)
    

});
