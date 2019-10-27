const TodoModel = require('../models/Todo');

class TodoController {
    getAll(req, res) {
        async function main() {
            const todo = await TodoModel.find({});
            if (todo) res.status(200).json({todo, status: 0})
        }

        return main()
            .catch(err => res.status(500).json(err));
    }

    get(req, res) {
        const id = req.params.todoId;

        async function main() {
            const todo = await TodoModel.findById(id);
            if (todo) res.status(200).json({status: 0, todo})
        }

        return main()
            .catch(err => res.status(500).json(err));
    }

    create(req, res) {
        async function main() {
            const newTodo = new TodoModel(req.body);
            const todo = await newTodo.save();
            if (todo) res.status(200).json({msg: 'Todo successfully created', todo, status: 0})
        }

        return main()
            .catch(err => res.status(500).json(err));
    }

    update(req, res) {
        const id = req.params.todoId;

        async function main() {
            const updatedTodo = req.body;
            const todo = await TodoModel.findOneAndUpdate({_id: id}, {$set: updatedTodo}, {new: true});
            if (todo) res.status(200).json({msg: 'Todo successfully updated', todo, status: 0});
        }

        return main()
            .catch(err => res.status(500).json(err));
    }

    toggle(req, res) {
        const id = req.params.todoId;

        async function main() {
            const todo = await TodoModel.findById(id);

            if (todo) {
                todo.toggle = !todo.toggle;
                todo.save();
                res.status(200).json({msg: 'Todo successfully toggled', todo, status: 0})
            }
        }

        return main()
            .catch(err => res.status(500).json(err));
    }

    delete(req, res) {
        const id = req.params.todoId;

        async function main() {
            const todo = await TodoModel.deleteOne({_id: id});
            if (todo) res.status(200).json({msg: 'Todo successfully removed', id, status: 0});
        }

        return main()
            .catch(err => res.status(500).json(err));
    }
}


module.exports = new TodoController();