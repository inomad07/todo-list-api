'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoListController');

// Add headers
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/all', controller.list_all_tasks);
router.get('/:taskId', controller.read_a_task);

router.put('/:taskId', controller.update_a_task);
router.put('/:taskId/changeState', controller.change_state);
router.delete('/:taskId', controller.delete_a_task);

router.post('/', controller.create_a_task);



module.exports = router;