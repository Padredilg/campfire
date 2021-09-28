const socket = io(); 
let formEl = document.getElementById('chat-form');
let newChatMessageEl = document.getElementById('new-chat-message');
let messagesEl = document.getElementById('messages');
let hiddenUsernameEl = document.getElementById('username');
// let channelBtnsEls = document.querySelectorAll('.channelBtn');

const username = hiddenUsernameEl.textContent;

// let messageToSendEl = document.getElementById('message-to-send');
// channelBtns.forEach((element, index)  => {
//     element.onclick = (event) => {
//         let channelName = element.textContent;
//         socket.emit('new-user', channelName, username)
//     }
// });

formEl.addEventListener('submit', function(e) {
    e.preventDefault();
    if (newChatMessageEl.value) {
        socket.emit('send-chat-message', username, newChatMessageEl.value);
        newChatMessageEl.value = '';
    }
});


socket.on('chat-message', function(message) {
    let row = document.createElement("div");
    row.className = "row";
    let userName = document.createElement("div");
    userName.className = "col-3 mr-0 text-right chat-user text-truncate";
    userName.textContent = message.username;
    let messageEl = document.createElement("div");
    messageEl.className = "col-9 ml-0 text-left chat-message";
    messageEl.textContent = message.msg;
    row.appendChild(userName);
    row.appendChild(messageEl);
    messagesEl.appendChild(row);
});
 