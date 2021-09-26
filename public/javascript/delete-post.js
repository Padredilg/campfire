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
        document.location.href = '/'; /* bjj - This used to be to '/homepage', but I think we need this to go to '/' so that the correct parameters will be passed to homepage */
    } 
    else {
        alert(response.statusText);
    }
}
  
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);