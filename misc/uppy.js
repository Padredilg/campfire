const Uppy = require('@uppy/core');
const DragDrop = require('@uppy/drag-drop');
const Tus = require('@uppy/tus');

const uppy = new Uppy({
  debug: true, 
  autoProceed: true,
  restrictions: {
    allowedFileTypes: ['image/*']
  }
});

uppy
  .use(DragDrop, {target: '#drag-drop-modal'})
  .use(Tus, {endpoint: 'https://tusd.tusdemo.net/files/'})
  .on('upload-success', (file, response) => {
    saveImgUrl(response.uploadURL);
  })
  .on('error', (error) => {
    console.log(error);
});
