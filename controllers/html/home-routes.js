const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Channel } = require('../../models');
const withAuth = require('../../utils/auth');


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

//Edit a post
router.get('/post/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
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
        
        const post = dbPostData.get({ plain: true });
         
        //If user isnt the owner, then he/she can't edit post
        if(post.user_id !== req.session.user_id){
            res.redirect('/homepage')
        }

        res.render('edit-post', { 
            post, 
            loggedIn: true,
            username: req.session.username
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/test1/', (req, res) => {
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
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
})

//Initial page - Global Feed - :option? is an optional argument that for sorting purposes it can be left empty, or be oldest, newest, or most-popular
router.get('/:option?', (req, res) => {
    let orderBy = [['created_at', 'DESC']];
    if (req.params.option === 'most-popular') {
        orderBy = [[[sequelize.literal('love_count DESC')]]]
    }
    else if(req.params.option === 'oldest'){
        orderBy = [['created_at', 'ASC']];
    }
    else if(req.params.option === 'newest'){
        orderBy = [['created_at', 'DESC']];
    }

    console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'content',
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
        ],
        order: orderBy,
    })
    .then(dbPostData => {
        // pass all the postst into the homepage template
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
            username: req.session.username,
            globalFeed: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;