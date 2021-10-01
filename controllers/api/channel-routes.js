const router = require('express').Router();
const { Channel } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) => {
    Channel.findAll({
        attributes: [
            'id',
            'name'
        ],
        order: [['name', 'ASC']]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:name', withAuth,  (req, res) => {
    
});

router.post('/', withAuth,  (req, res) => {
    Channel.create({
        name: req.body.name,
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;