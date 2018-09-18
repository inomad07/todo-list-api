const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
    text: String,
    toggle: Boolean
});

module.exports = mongoose.model('Tasks', TaskSchema);