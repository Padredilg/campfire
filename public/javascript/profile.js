const editEl = document.querySelector('#edit');
const bioEl = document.querySelector('#user-bio');

const editHandler = () => {
  // textarea to edit bio
  const bioTextArea = document.createElement('textarea');
  bioTextArea.id = 'user-bio-edit';
  bioTextArea.className = 'user-bio-edit';
  bioTextArea.textContent = bioEl.textContent;
  bioEl.replaceWith(bioTextArea);

  // wait 1 second and add event listener to save profile info
  setTimeout(() => {
    document.addEventListener('click', saveHandler);
  }, 1000);
};

const saveHandler = (event) => {
  const bioTextArea = document.querySelector('#user-bio-edit');

  if (event.target !== bioTextArea) {

    fetch(`/api/users/`, {
      method: 'put',
      body: JSON.stringify({
          bio: bioTextArea.value
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => console.log(data));
    
    bioEl.textContent = bioTextArea.value;
    bioTextArea.replaceWith(bioEl);

    document.removeEventListener('click', saveHandler);
  }
};

editEl.addEventListener('click', editHandler);