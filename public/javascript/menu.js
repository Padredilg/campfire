async function menuFriendsHandler(event) {

    event.preventDefault();

    friendListEl = document.querySelector('.friend-list');
    alert("menuFriendsHandler");

    // get the list of friends of the logged in user
    const response = await fetch(`/api/friendships/friends`, {
        method: 'get',
        //     body: JSON.stringify({fred: "fred"
        // }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert("response ok");

        var friends = await response.json();
        alert(`friends = response.json() = ${friends}`);
            

        friends.forEach(friend => {
            // create the list item and format it
            var listItemEl = document.createElement("li");
            listItemEl.className = "menu-friend-item";

            // add friend id as a custom attribute
            listItemEl.setAttribute("friend-id", friend.user_id);

            // create div to hold task info and add to list item
            var friendInfoEl = document.createElement("p");
            friendInfoEl.className = "menu-friend-info";
            friendInfoEl.innerHTML = friend.username; // need this to be a button, but for now let's just display the name

            listItemEl.appendChild(taskInfoEl);
        })
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#menu-friends').addEventListener('click', menuFriendsHandler);

