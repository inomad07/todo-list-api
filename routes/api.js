const express = require('express');
const router = express.Router();
const TodoResource = require('../resources/TodoResource');

// Add headers
router.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS, HEAD");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/all', TodoResource.getAll.bind(TodoResource));
router.get('/:todoId', TodoResource.get.bind(TodoResource));

router.post('/', TodoResource.create.bind(TodoResource));

router.put('/:todoId', TodoResource.update.bind(TodoResource));
// router.put('/:todoId/changeState', TodoResource.toggle.bind(TodoResource));

router.delete('/:todoId', TodoResource.delete.bind(TodoResource));

router.get('/', function(req, res) {
    res.send('Hello world');
});



module.exports = router;