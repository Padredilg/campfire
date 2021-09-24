const router = require('express').Router();
const {User, Friendship} = require('../../models');

router.get('/', (req, res) => {
  Friendship.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbFriendshipData => res.json(dbFriendshipData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', ({body}, res) => {
  Friendship.create({
    requesting_user_id: body.requestingID,
    requested_user_id: body.requestedID
  })
    .then(dbFriendshipData => res.json(dbFriendshipData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;