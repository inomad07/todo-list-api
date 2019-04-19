const TodoModel = require('../models/Todo');
const clientResponse = require('../helpers/SendResponse');

class TodoResource {

    getAll(req, res) {
        async function main() {
            let todo = await TodoModel.find({});
            if (todo) return res.status(200).send(todo)
        }
        return main()
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    get(req, res) {
        async function main() {
            let todo = await TodoModel.findById(req.params.todoId);
            if (todo) return res.status(200).send(todo)
        }
        return main()
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    create(req, res) {
        async function main() {
            let newTodo = new TodoModel(req.body);
            let todo = await newTodo.save();
            if (todo) return res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully created', todo))
        }
        return main()
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    update(req, res) {
        async function main() {
            let id = req.params.todoId;
            let updatedTodo = req.body;
            updatedTodo = clientResponse.normalizeObject(updatedTodo);
            let todo = await TodoModel.findOneAndUpdate({_id: id}, {$set: updatedTodo}, {new: true});
            if (todo) return res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully updated', todo));
        }

        return main()
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    toggle(req, res) {
        let id = req.params.todoId;

        async function main() {
            let todo = await TodoModel.findById(id);

            if (todo) {
                todo.toggle = !todo.toggle;
                todo.save();
                return res.status(200).json(todo)
            }
        }

        return main()
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    delete(req, res) {
        let id = req.params.todoId;

        async function main() {
            let todo = await TodoModel.deleteOne({_id: id});
            if (todo) return res.status(200).json(todo);
        }

        return main()
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }

}


module.exports = new TodoResource();