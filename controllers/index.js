const router = require('express').Router();

const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);

router.use((req, res) => {//Catch-all route for wrong searches!
  res.send("<h1>Wrong Route!</h1>")
  //try to redirect back to homepage
});

module.exports = router;