const router = require('express').Router();
const { Post, User, Love, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// http://localhost:3001/api/posts
/* POST new Post, PUT love, PUT update post, AND DELETE a post will all need withAuth for security reasons. We must add them after the test phase is done*/

// GET all posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        // Query configuration
        attributes: [
            'id',
            'content',
            'created_at',
            'user_id',
            [sequelize.literal('(SELECT COUNT(*) FROM love WHERE post.id = love.post_id)'), 'love_count']//this property displays the love_count
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
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});

//GET post by ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'created_at',
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
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST create new post
router.post('/', (req, res) => {
    console.log("POST", req);
    // expects {title: 'Taskmaster goes public!', content: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT - love (or dislove) a post
//needs to be before PUT by /:id, or express will think uplove is an id param
router.put('/uplove', (req, res) => {
    // make sure the session exists first
    if (req.session) {
        // pass session id along with all destructured properties on req.body
        Post.uplove({ ...req.body, user_id: req.session.user_id }, { Love, Comment, User })
            .then(updatedLoveData => res.json(updatedLoveData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

//PUT update a post (title and content)
router.put('/:id', (req, res) => {
    Post.update(
        {
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;