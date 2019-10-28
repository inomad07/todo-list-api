const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TodoSchema = new Schema({
    text: String,
    toggle: Boolean
}, { usePushEach: true });


const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;