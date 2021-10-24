const TodoModel = require('../schemas/todo.schema');


function getAll() {
    async function main() {
        const todo = await TodoModel.find({});
        return todo
    }

    return main()
        .catch(err => console.log(err));
}

function get(id) {
    async function main() {
        const todo = await TodoModel.findById(id);
        return todo
    }

    return main()
        .catch(err => console.log(err));
}

function create(userParam) {
    async function main() {
        const newTodo = new TodoModel(userParam);
        const todo = await newTodo.save();
        return todo
    }

    return main()
        .catch(err => console.log(err));
}

function update(id, updatedTodo) {
    async function main() {
        const todo = await TodoModel.findOneAndUpdate({_id: id}, {$set: updatedTodo}, {new: true});
        return todo
    }

    return main()
        .catch(err => console.log(err));
}

function toggle(id) {
    async function main() {
        const todo = await TodoModel.findById(id);
        if(!todo) return {err: 'Not found'}

        todo.toggle = !todo.toggle;
        todo.save();
        return todo
    }

    return main()
        .catch(err => console.log(err));
}

function remove(id) {
    async function main() {
        const todo = await TodoModel.deleteOne({_id: id});
        return todo
    }

    return main()
        .catch(err => console.log(err));
}

module.exports = {
    get,
    getAll,
    create,
    update,
    toggle,
    remove
};