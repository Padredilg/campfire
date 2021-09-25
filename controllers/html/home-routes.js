const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Channel } = require('../../models');
const withAuth = require('../../utils/auth');

//When Login works withAuth on single-post

//Initial page - Global Feed
router.get('/', (req, res) => {
    console.log(req.session);
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
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // pass a single post object into the homepage template
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

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Login Page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//Signup Page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

//Single Post (View Comments) Page
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
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
            attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
        return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });
        if(post.user_id === req.session.user_id){
            post.edit = true;
        }
        else{
            post.edit = false;
        }

        // pass data to template
        res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
      });
});

router.get('/test', (req, res) => {
    if (req.session.loggedIn) {
        console.log('loggin')
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        },
        include: [
            {model: Channel}
        ]
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        // res.json(data)
        const channels = data.channels.map(channel => channel.get({ plain: true}));
        // res.json(channels)
        res.render('test', {
            channels,
            loggedIn: req.session.loggedIn,
            username: req.session.username
        });
        console.log(data.channels[0].name)

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    }
});



module.exports = router;