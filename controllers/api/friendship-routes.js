const router = require('express').Router();
const {User, Friendship} = require('../../models');
const {Op} = require('sequelize');

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

// find specific friendship by id
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

// find all friendships of specific user
router.get('/user', (req, res) => {
  Friendship.findAll({
    where: {
      [Op.or] :[
        {requesting_user_id: req.session.user_id},
        {requested_user_id: req.session.user_id}
      ]
    },
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