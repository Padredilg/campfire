const router = require('express').Router();
const {User, Friendship} = require('../../models');

router.get('/', (req, res) => {
  Friendship.findAll({
    include: [
      {
        model: User,
        as: 'requested',
        attributes: ['username']
      },
      {
        model: User,
        as: 'requesting',
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

router.get('/:id', ({params}, res) => {
  Friendship.findOne({
    where: {id: params.id},
    include: [
      {
        model: User,
        as: 'requested',
        attributes: ['username']
      },
      {
        model: User,
        as: 'requesting',
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

// I don't think we require a put route, what info would you need to update in a friendship?

router.delete('/:id', ({params}, res) => {
  Friendship.destroy({
    where: {id: params.id}
  })
    .then(dbFriendshipData => res.json(dbFriendshipData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;