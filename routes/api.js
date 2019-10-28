const express = require('express');
const router = express.Router();
const controller = require('../controllers/TodoController');

router.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function(req, res) {
    res.send('It works!');
});

router.get('/all', controller.getAll);
router.get('/:todoId', controller.get);

router.post('/', controller.create);

router.put('/:todoId', controller.update);
router.put('/:todoId/toggle', controller.toggle);

router.delete('/:todoId', controller.remove);



module.exports = router;