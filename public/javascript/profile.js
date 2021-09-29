// DOM elements
const editBioButtonEl = document.querySelector('#edit-bio-button');
const bioEl = document.querySelector('#user-bio');
const uploadImageButtonEl = document.querySelector('#upload-img-button');
const dragDropModalEl = document.querySelector('#drag-drop-modal');

const editBio = () => {
  // textarea to edit bio
  const bioTextArea = document.createElement('textarea');
  bioTextArea.id = 'user-bio-edit';
  bioTextArea.className = 'user-bio-edit';
  bioTextArea.textContent = bioEl.textContent;
  bioEl.replaceWith(bioTextArea);

  // wait 1 second and add event listener to save profile info
  setTimeout(() => {
    document.addEventListener('click', saveBio);
  }, 200);
};

const saveBio = (event) => {
  const bioTextArea = document.querySelector('#user-bio-edit');

  if (event.target !== bioTextArea) {
    // make PUT request
    updateDatabase({bio: bioTextArea.value})
    
    // reset bio textarea
    bioEl.textContent = bioTextArea.value;
    bioTextArea.replaceWith(bioEl);

    document.removeEventListener('click', saveBio);
  }
};

const uploadImage = () => {
  dragDropModalEl.classList.remove('none');

  setTimeout(() => {
    document.addEventListener('click', saveImgUrl);
  }, 200);
};

const saveImgUrl = (img_url) => {
  dragDropModalEl.classList.add('none');
  
  document.removeEventListener('click', saveImgUrl);
  console.log(typeof img_url);

  if (typeof img_url === 'string') {
    updateDatabase({img_url})
    .then(() => {
      location.reload();
    });
  }
};

// function to hold fetch request
const updateDatabase = async (body) => {
  console.log(body);
  
  const response = await fetch(`/api/users/`, {
    method: 'put',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();

  console.log(data);
};

editBioButtonEl.addEventListener('click', editBio);
uploadImageButtonEl.addEventListener('click', uploadImage);