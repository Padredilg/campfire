let socket = io(); 
let form = document.getElementById('form');
let input = document.getElementById('input');
let messages = document.getElementById('posts');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
    }
});

socket.on('chat message', function(msg) {
    // var item = document.createElement('li');
    // item.textContent = msg;
    // messages.appendChild(item);
    fetch(
        'http://localhost:3001/api/channels/'
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
        });
});


// fetch(
//     'https://api.giphy.com/v1/gifs/trending?api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN'
//   )
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//     });