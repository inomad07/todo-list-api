const TodoModel = require('../models/Todo');
const clientResponse = require('../helpers/SendResponse');

class TodoResource {

    getAll(req, res) {
        TodoModel.find({}, (err, todo) => {
            if (err) return res.status(500).json(clientResponse.sendErrorMsg(err));
            res.status(200).send(todo);
        });
    }


    get(req, res) {
        TodoModel.findById(req.params.id, (err, todo) => {
            if (err) return res.status(500).json(clientResponse.sendErrorMsg(err));
            res.status(200).send(todo);
        });
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
            return await TodoModel.findOneAndUpdate({_id: id}, {$set: updatedTodo}, {new: true}, (err, todo) => {
                if (err) {
                    console.log('Cannot update')
                }
                res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully updated', todo));
            });
        }

        return main()
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    toggle(req, res) {
        let id = req.params.todoId;

        TodoModel.findById(id)
            .then((todo) => {
                todo.toggle = !todo.toggle;
                return todo.save();
            })
            .then((todo) => {
                return res.status(200).json(todo)
            })
            .catch((err) => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    delete(req, res) {
        let id = req.params.todoId;
        return TodoModel.deleteOne({_id: id}, (err, todo) => {
            if (err)
                res.send(err);
            res.json(todo);
        });
    }

}


module.exports = new TodoResource();