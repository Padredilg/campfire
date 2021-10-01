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
        document.location.href = '/posts-wall'; /* bjj - This used to be to '/homepage', but I think we need this to go to '/' so that the correct parameters will be passed to homepage */
    } 
    else {
        alert(response.statusText);
    }
}

const dpbEl = document.querySelector('.delete-post-btn');
// if the user is not logged in, the delete button has not been created.
if (dpbEl) {
    dpbEl.addEventListener('click', deleteFormHandler);
}