const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models');

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
  .then(dbPostData => {
    res.json(dbPostData);
    // const posts = dbPostData.map(post => {
    //   post = post.get({ plain: true })

    //   if(post.user_id === req.session.user_id){
    //       post.edit = true;
    //   }
    //   else{
    //       post.edit = false;
    //   }
    //   return post;
    // });

    // let user;
    // if (posts.length > 0) {
    //   user = posts[0].user;
    //   if (user.id === req.session.user_id) {
    //     user.edit = true;
    //   } else {
    //     user.edit = false;
    //   }
    // } 

    // let renderOptions;
    // if (user) {
    //   renderOptions = {
    //     user,
    //     posts,
    //     loggedIn: req.session.loggedIn,
    //     username: req.session.username
    //   }
    // } else {
    //   renderOptions = {
    //     posts,
    //     loggedIn: req.session.loggedIn,
    //     username: req.session.username
    //   }
    // }
    // console.log(renderOptions);

    // res.render('profile', {renderOptions});
  });
});

module.exports = router;