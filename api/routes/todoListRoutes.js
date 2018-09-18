const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoListController');

// // Add headers
router.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/all', controller.list_all_tasks);
router.get('/:todoId', controller.read_a_task);

router.put('/:todoId', controller.update_a_task);
router.put('/:todoId/changeState', controller.change_state);
router.delete('/:todoId', controller.delete_a_task);

router.post('/', controller.create_a_task);



module.exports = router;