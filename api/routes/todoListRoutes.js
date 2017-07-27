'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/todoListController');

router.get('/all', controller.list_all_tasks);
router.get('/:taskId', controller.read_a_task);

router.put('/:taskId', controller.update_a_task);
router.delete('/:taskId', controller.delete_a_task);

router.post('/', controller.create_a_task);



module.exports = router;