const express = require('express');
const router = express.Router();
const TodoResource = require('../resources/TodoResource');
const helmet = require('helmet');

// Add headers
router.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }));
router.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/:todoId', TodoResource.get.bind(TodoResource));
router.get('/all', TodoResource.getAll.bind(TodoResource));

router.post('/', TodoResource.create.bind(TodoResource));

router.put('/:todoId', TodoResource.update.bind(TodoResource));
router.put('/:todoId/changeState', TodoResource.editTodo.bind(TodoResource));

router.delete('/:todoId', TodoResource.delete.bind(TodoResource));





module.exports = router;