
const validatePassword = (pwd, cPwd) => {
    const disallowedChars = ' ';
    if (pwd !== cPwd) {
        alert(`The passwords do not match.`);
        return false;
    } else if (pwd.includes(disallowedChars)) {
        // if we add disallowed characters other than spaces, change this message to something like:
        // `The following characters, including spaces, are not allowed: ${disallowedChars}` 
        alert('You cannot include spaces in your password.');
        return false;
    }
    return true;
}

const validateUserName = (userName) => {
    if (userName.length > 30) {
        alert(`The user name cannot be longer than 30 characters.`);
        return false;
    }
    return true;
}

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmpassword").value;
    const email = document.querySelector("#email").value.trim();

    if (username && password && confirmPassword && email) {
        if (!validatePassword(password, confirmPassword)) {
            // validatePassword already displayed the error message
            return;
        }
        if (!validateUserName(username)) {
            // validateUserName already displayed the error message
            return;
        }

        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password,
                email
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            document.location.replace('/'); 
        } else {
            response.json()
            .then(data => {
                alert(data.message);
            })
        }
    } else {
        alert("You must supply a valid email address, user name, and password");
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
