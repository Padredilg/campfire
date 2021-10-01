async function loginFormHandler(event) {

    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        // check the response status
        if (response.ok) {
            // document.location.replace('/'); 
            document.location.replace('/'); 
        } else {
            response.json()
            .then(data => {
                alert(data.message);
            })
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

