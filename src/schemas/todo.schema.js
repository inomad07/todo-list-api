const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {type: String},
    toggle: {type: Boolean}
}, { usePushEach: true });

const TodoSchema = mongoose.model('todo', todoSchema);

module.exports = TodoSchema;