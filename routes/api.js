const express = require('express');
const router = express.Router();
const { getAll, get, update, toggle, remove, create } = require('../controllers/TodoController');

router.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', (req, res) => {
    res.send('It works!');
});


router.get('/all', getAll);
router.get('/:todoId', get);

router.post('/', create);

router.put('/:todoId', update);
router.put('/:todoId/toggle', toggle);

router.delete('/:todoId', remove);


module.exports = router;