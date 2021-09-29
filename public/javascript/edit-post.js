async function editFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    //title is the value in the input box with id title-name
    const content = document.querySelector('textarea[name="post-content"]').value;



    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();;
    } 
    else {
        alert(response.statusText);
    }
}

function goBack(){
    window.history.back();
}

const epfEl = document.querySelector('.edit-post-form')
// if the user is not logged in, the edit post form has not been created.
if (epfEl) {
    epfEl.addEventListener('submit', editFormHandler);
}
document.querySelector('.back').addEventListener('click', goBack);
