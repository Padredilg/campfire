const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
        'id',
        'content',
        'title',
        'created_at',
        'user_id',
        [sequelize.literal('(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)'), 'love_count']
    ],
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
            attributes: ['id', 'username', 'bio', 'img_url'],
            where: {
              id: req.session.user_id
            }
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

    const user = posts[0].user;
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