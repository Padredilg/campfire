const editEl = document.querySelector('#edit');
const bioEl = document.querySelector('#user-bio');

const editHandler = () => {
  // textarea to edit bio
  const bioTextArea = document.createElement('textarea');
  bioTextArea.id = 'user-bio-edit';
  bioTextArea.textContent = bioEl.textContent;
  bioEl.replaceWith(bioTextArea);
};

editEl.addEventListener('click', editHandler);