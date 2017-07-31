'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    text: String,
    done: Boolean
});

module.exports = mongoose.model('Tasks', TaskSchema);