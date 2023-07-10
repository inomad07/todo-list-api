const express = require('express');
const router = express.Router();
const { getAll, get, create, update, toggle, remove } = require('../controllers/TodoController');

// Add headers
router.use( (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS, HEAD');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

router.get('/all', getAll);
router.get('/:todoId', get);

router.post('/', create);

router.put('/:todoId', update);
router.put('/:todoId/toggle', toggle);

router.delete('/:todoId', remove);

router.get('/', (req, res) => {
	res.send('Welcome to Todo List API server!')
});



module.exports = router;