async function newFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;
  
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(title, content);

    
    if (response.ok) {
        document.location.replace('/');
    } 
    else {
        alert(response.statusText);
    }
  }
  
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);