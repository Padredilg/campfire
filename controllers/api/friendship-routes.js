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

// get all the friends the logged in user has
router.get('/friends', (req, res) => {
    console.log("============================/api/friendships/friends");
    Friendship.findAll({
        where: {
            [Op.or]: [
                { requesting_user_id: req.session.user_id },
                { requested_user_id: req.session.user_id }
            ]
        },
        include: [
            {
                model: User,
                as: 'requested',
                attributes: ['username', 'user_id']
            },
            {
                model: User,
                as: 'requesting',
                attributes: ['username', 'user_id']
            }
        ]
    })
        .then(dbData => {
            alert("got the data");
            const friends = dbData.map(friendship => {
                if (friendship.requesting.user_id === req.session.user_id) {
                    return friendship.requested;
                } else {
                    return friendship.requesting;
                }
            });
            alert(`user id {req.session._userid is friends with: ${friends}`);
            res.json(friends);
        })
        .catch(err => {
            alert("can't get the data");
            console.log(err);
            res.status(500).json(err);
        });
});
  
router.get('/:id', ({params}, res) => {
    console.log("========================= with an id");
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