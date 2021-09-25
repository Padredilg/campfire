async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'content-Type': 'application/json' }
    });

    if (response.ok) {
        // use this to refresh the current page instead of going to the home page: document.location.reload();
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#logout').addEventListener('click', logout);

