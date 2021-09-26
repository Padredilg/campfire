const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');

router.get('/', (req, res) => {
  res.render('profile');
});

router.get('/:id', (req, res) => {
  Post.findAll({
    attributes: [
        'id',
        'content',
        'title',
        'created_at',
        'user_id',
        [sequelize.literal('(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)'), 'love_count']
    ],
    where: {
      id: req.params.id
    },
    include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
})
  .then(dbPostData => {
    const posts = dbPostData.map(post => {
      post = post.get({ plain: true })

      if(post.user_id === req.session.user_id){
          post.edit = true;
      }
      else{
          post.edit = false;
      }
      return post;
    });

    res.render('profile', {
        posts,
        loggedIn: req.session.loggedIn,
        username: req.session.username
    });
  });
});

module.exports = router;