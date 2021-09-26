async function deleteFormHandler(event) {
    event.preventDefault();
    //if button is clicked, get the post's id
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.href = '/homepage';
    } 
    else {
        alert(response.statusText);
    }
}
  
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);