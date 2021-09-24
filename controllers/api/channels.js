const router = require('express').Router();

router.get('/', (req, res) => {
    let x = {'name': 'test'}
    res.json(x)
});

router.get('/:name',  (req, res) => {
    
});

module.exports = router;