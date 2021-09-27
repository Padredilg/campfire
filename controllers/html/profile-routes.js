const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');

// GET current user profile
router.get('/', (req, res) => {
  User.findOne({
    where: {id: req.session.user_id},
    attributes: ['id', 'username', 'bio', 'img_url'],
    include: [
      {
        model: Post,
        attributes: [
          'id',
          'content',
          'created_at',
          'user_id',
          [sequelize.literal('(SELECT COUNT(*) FROM love WHERE love.post_id = id)'), 'love_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
          }
        ]
      }
    ]
  })
  .then(dbUserData => {
    const user = dbUserData.get({plain: true});
    const posts = user.posts.map(post => {
      if(post.user_id === req.session.user_id){
        post.edit = true;
      } else {
        post.edit = false;
      }
      return post;
    });

    if (user.id === req.session.user_id) {
      user.edit = true;
    } else {
      user.edit = false;
    }
    
    res.render('profile', {
      user,
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  });
});

// GET user profile by ID
router.get('/:id', (req, res) => {
  User.findOne({
    where: {id: req.params.id},
    attributes: ['id', 'username', 'bio', 'img_url'],
    include: [
      {
        model: Post,
        attributes: [
          'id',
          'content',
          'created_at',
          'user_id',
          [sequelize.literal('(SELECT COUNT(*) FROM love WHERE love.post_id = id)'), 'love_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
          }
        ]
      }
    ]
  })
  .then(dbUserData => {
    const user = dbUserData.get({plain: true});
    const posts = user.posts.map(post => {
      if(post.user_id === req.session.user_id){
        post.edit = true;
      } else {
        post.edit = false;
      }
      return post;
    });

    if (user.id === req.session.user_id) {
      user.edit = true;
    } else {
      user.edit = false;
    }
    
    res.render('profile', {
      user,
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username
    });
  });
});

module.exports = router;