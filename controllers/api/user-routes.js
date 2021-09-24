const router = require('express').Router();
const { User, Post, Like, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// http://localhost:3001/api/users
/* UPDATE LOGOUT AND DELETE WILL NEED withAuth for security reasons we must add them after the test phase is done*/

// GET all users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET user by ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title'],
                through: Like,
                as: 'liked_posts'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    });
});

// POST create a user, used on signup
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        console.log(dbUserData);
        
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
        
            res.json(dbUserData);
        });
    })
    .catch(err => {
      //This will send different alerts for the user when signup fails
        if(err.errors[0].validatorKey === 'len'){
            res.status(500).send({ message: "Password needs to be at least 4 characters long."})
        }
        else if(err.errors[0].validatorKey === 'not_unique'){
            res.status(500).send({ message: "An account with this email already exists"})
        }
        else if(err.errors[0].validatorKey === 'isEmail'){
            res.status(500).send({ message: "Please check the formatting of your email"})
        }
        else{
            res.status(500).send({ message: 'Failed to Signup'});
        }
    });
});

// PUT update a user by ID
router.put('/:id', (req, res) => {
  /*passing req.body implies that the body to be updated needs to match
  the format of the body created*/
    User.update(req.body, {
        individualHooks: true,
        where: {
        id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Login route
router.post('/login', (req, res) => {
        User.findOne({
          //look for email on database
            where: {
                email: req.body.email
            }
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user with that email address!' });
                return;
            }
            //verify password
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }
            //if email and password match, save cookie
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
          
                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        });  
});

// Logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
      }
      else {
            res.status(404).end();
      }
});

// DELETE user by ID
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;