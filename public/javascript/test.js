const socket = io(); 
let form = document.getElementById('meatballs');
let input = document.getElementById('input');
let messages = document.getElementById('messages');
let hiddenUsername = document.getElementById('username');
let channelBtns = document.querySelectorAll('.channelBtn');

const username = hiddenUsername.textContent;

function channelBtnHandler(e) {
    e.preventDefault();
    console.log(e)
}

channelBtns.forEach((element, index)  => {
    element.onclick = (event) => {
        let channelName = element.textContent;
        socket.emit('new-user', channelName, username)
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('send-chat-message', username, input.value);
    input.value = '';
    }
});


socket.on('chat-message', function(message) {
    var item = document.createElement('p');
    item.className = "m-1"
    item.textContent = `${message.username}: ${message.msg}`;
    messages.appendChild(item);
    console.log('message: '+ message.msg)
});
