const Todo = require('../models/Todo')

function getAll(req, res) {
    async function main() {
        const todo = await Todo.getAll()
        if (todo) res.status(200).json({todo, status: 0})
    }

    return main()
        .catch(err => res.status(500).json(err));
}

function get(req, res) {
    const id = req.params.todoId;

    async function main() {
        const todo = await Todo.get(id);
        if (todo) res.status(200).json({status: 0, todo})
    }

    return main()
        .catch(err => res.status(500).json(err));
}

function create(req, res) {
    async function main() {
        const todo = await Todo.create(req.body);
        if (todo) res.status(200).json({todo, msg: 'Todo successfully created', status: 0})
    }

    return main()
        .catch(err => res.status(500).json(err));
}

function update(req, res) {
    const id = req.params.todoId;

    async function main() {
        const updatedTodo = req.body;
        const todo = await Todo.update(id, updatedTodo)

        if (todo) res.status(200).json({todo, msg: 'Todo successfully updated', status: 0})
    }

    return main()
        .catch(err => res.status(500).json(err));
}

function toggle(req, res) {
    const id = req.params.todoId;

    async function main() {
        const todo = await Todo.toggle(id);
        if(todo.err) {
            return res.status(400).json(todo)
        }
        res.status(200).json({todo, msg: 'Todo successfully toggled', status: 0})
    }

    return main()
        .catch(err => res.status(500).json(err));
}

function remove(req, res) {
    const id = req.params.todoId;

    async function main() {
        const todo = await Todo.remove(id)
        if (todo) res.status(200).json({id, msg: 'Todo successfully removed', status: 0});
    }

    return main()
        .catch(err => res.status(500).json(err));
}


module.exports = {
    getAll,
    get,
    create,
    update,
    toggle,
    remove
};
