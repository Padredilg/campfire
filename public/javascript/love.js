async function upvoteClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    // Get id from from post
  
    const response = await fetch('/api/posts/uplove', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
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

var allBtns = document.querySelectorAll(".love-btn"); //[button1 , button2]
//for loop on the buttons
allBtns.forEach((button)=>{
    button.addEventListener("click", upvoteClickHandler);
})