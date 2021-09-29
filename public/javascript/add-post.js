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
        document.location.replace('/');
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