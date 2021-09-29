const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');

async function newFormHandler(event) {
    event.preventDefault();
    const content = document.querySelector('textarea[name="post-content"]').value;
  
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        document.location.reload();
    } 
    else {
        alert(response.statusText);
    }
  }

const npfEl = document.querySelector('.new-post-form');
// if the user is not logged in, the new post form has not been created.
if (npfEl) {
    npfEl.addEventListener('submit', newFormHandler);
}

//open popup window
function openModal(message){
    const prompt = document.getElementById('prompt');
    prompt.textContent = message
    popup.classList.add("active");
    overlay.classList.add("active");
}

//close popup window
function closeModal(){
   
    popup.classList.remove("active");
    overlay.classList.remove("active");
}

overlay.addEventListener('click', () => {
    closeModal();
});

closePopup.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
});