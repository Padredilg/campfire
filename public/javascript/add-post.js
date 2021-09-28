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
  
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);