// DOM elements
const editBioButtonEl = document.querySelector('#edit-bio-button');
const bioEl = document.querySelector('#user-bio');
const pictureEl = document.querySelector('#user-img');
const dragDropModalEl = document.querySelector('#drag-drop-modal');

const editHandler = () => {
  // event listener to update profile picture
  pictureEl.addEventListener('click', dragDropHandler);
  
  // textarea to edit bio
  const bioTextArea = document.createElement('textarea');
  bioTextArea.id = 'user-bio-edit';
  bioTextArea.className = 'user-bio-edit';
  bioTextArea.textContent = bioEl.textContent;
  bioEl.replaceWith(bioTextArea);

  //There needs to be a different logic to call saveHandler
  // wait 1 second and add event listener to save profile info
  setTimeout(() => {
    document.addEventListener('click', saveHandler);
  }, 1000);
};

const saveHandler = (event) => {
  const bioTextArea = document.querySelector('#user-bio-edit');

  if (event.target !== 
    bioTextArea || 
    dragDropModalEl || 
    pictureEl) {

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

const dragDropHandler = () => {
  dragDropModalEl.classList.remove('none');
};

editBioButtonEl.addEventListener('click', editHandler);