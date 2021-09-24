const router = require('express').Router();
const {User} = require('../../models');

router.get('/', (req, res) => {
  User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', ({body}, res) => {
  User.create({
    username: body.username,
    email: body.email,
    password: body.password
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;