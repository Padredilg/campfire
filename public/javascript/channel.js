const socket = io(); 
let form = document.getElementById('form');
let input = document.getElementById('input');
let messages = document.getElementById('posts');


let x = socket.emit('new-user', name)

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
    }
});

socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    console.log('message: '+ msg)
});
