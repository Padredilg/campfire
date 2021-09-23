async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/'); 
        } else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {

    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        // check the response status
        if (response.ok) {
            // document.location.replace('/'); 
            document.location.replace('/dashboard'); 
        } else {
            alert(response.statusText);
        }
    }
}

const signupFormEl = document.querySelector('.signup-form');
if (signupFormEl) {
    signupFormEl.addEventListener('submit', signupFormHandler);
}

const loginFormEl = document.querySelector('.login-form');
if (loginFormEl) {
    loginFormEl.addEventListener('submit', loginFormHandler);
}

