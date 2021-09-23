const router = require('express').Router();

const htmlRoutes = require('./html');
const apiRoutes = require('./api')

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {//Catch-all route for wrong searches!
  res.status(404).send("<h1>Wrong Route!</h1>");
  //try to redirect back to homepage
});

module.exports = router;