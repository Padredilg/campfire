const socket = io(); 
let formEl = document.getElementById('chat-form');
let newChatMessageEl = document.getElementById('new-chat-message');
let messagesEl = document.getElementById('chat-messages');
let noMessagesEl = document.getElementById('no-messages');
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


// I can't get the helpers.js functions into this file. For now, we'll have code duplication. After the presentation,
// I'll try to figure out how to do this without code duplication.
// This version will work if date is not passed in. It will also correctly display the minutes even if it's less than 10 minutes.
const formatDate = date => {
    const postTime = date ? new Date(date) : new Date();
    let month = postTime.getMonth() + 1;
    let day = postTime.getDate();
    let year = postTime.getFullYear();
    let hour = postTime.getHours();
    let minutes = postTime.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let amPm = 'AM'

    if(hour >= 13){
        hour -= 12;
        amPm = 'PM'
    }

    const today = new Date();
    if(day == today.getDate() && month == today.getMonth()+1 && year == today.getFullYear()){
        return `- Today at ${hour}:${minutes} ${amPm}`;
    }
    else{
        return `on ${month}/${day}/${year} at ${hour}:${minutes} ${amPm}`;
    }
};

formEl.addEventListener('submit', function(e) {
    e.preventDefault();
    if (newChatMessageEl.value) {
        socket.emit('send-chat-message', username, newChatMessageEl.value);
        newChatMessageEl.value = '';
    }
});

function submitOnEnter(event){
    if(event.which === 13){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    }
}

newChatMessageEl.addEventListener("keypress", submitOnEnter);

socket.on('chat-message', function(message) {

    if (noMessagesEl.style.display !== "none") {
        noMessagesEl.style.display = "none";
    }

    let messageInfo = document.createElement("section");
    messageInfo.className = "chat-message";
    let userInfo = document.createElement("div");
    userInfo.textContent = `${message.username} ${formatDate()}`;
    let messageText = document.createElement("div");
    messageText.textContent = message.msg;
    messageInfo.appendChild(userInfo);
    messageInfo.appendChild(messageText);
    messagesEl.appendChild(messageInfo);

    document.getElementById('chat-scroll-to-here').scrollIntoView();
    // messageInfo.scrollIntoView();
});
 