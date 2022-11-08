const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/TodoController');

// Add headers
router.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS, HEAD");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/all', TodoController.getAll.bind(TodoController));
router.get('/:todoId', TodoController.get.bind(TodoController));

router.post('/', TodoController.create.bind(TodoController));

router.put('/:todoId', TodoController.update.bind(TodoController));
router.put('/:todoId/toggle', TodoController.toggle.bind(TodoController));

router.delete('/:todoId', TodoController.delete.bind(TodoController));

router.get('/', (req, res) => {
    res.send('Welcome to Todo List API server!')
});



module.exports = router;
