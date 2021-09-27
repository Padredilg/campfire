async function menuFriendsHandler(event) {

    event.preventDefault();

    const friendListEl = document.querySelector('#friend-list');
    // clear out any existing friends
    while (friendListEl.firstChild) {
        friendListEl.removeChild(friendListEl.firstChild);
    }

    // get the list of friends of the logged in user
    const response = await fetch(`/api/friendships/friends`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const returned = await response.json();
        const id = returned.userid;
        const friends = returned.friends.map(friendship => {
            if (friendship.requesting.id === id) {
                return friendship.requested;
            } else {
                return friendship.requesting;
            }
        });

        friends.forEach(friend => {
            // create the list item and format it
            var listItemEl = document.createElement("li");

            // add friend id as a custom attribute
            listItemEl.setAttribute("friend-id", friend.id);

            // create div to hold task info and add to list item
            var friendInfoEl = document.createElement("button");
            friendInfoEl.className = "menu-friend-button";
            friendInfoEl.innerHTML = friend.username; 

            // <button type="button" id="menu-friends" class="link-button menu-button"><i class="fas fa-solid fa-user-group mr-1"></i>Friends</button>


            listItemEl.appendChild(friendInfoEl);

            friendListEl.appendChild(listItemEl);
        })
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#menu-friends').addEventListener('click', menuFriendsHandler);

