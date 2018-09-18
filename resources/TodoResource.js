const TodoModel = require('../models/Todo');
const clientResponse = require('../helpers/SendResponse');

class TodoResource {

    getAll(req, res) {
        return TodoModel.find({})
            .then(todo => {
                res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo list successfully received', todo));
            })
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    get(req, res) {
        let id = req.params.todoId;
        return TodoModel.findById(id)
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully received', todo)))
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    create(req, res) {
        let newTodo = new TodoModel();
        newTodo.text = req.body;
        newTodo.toggle = false;
        return newTodo.save()
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully created', todo)))
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    update(req, res) {
        let id = req.params.id;
        let updatedTodo = req.body;
        updatedTodo = clientResponse.normalizeObject(updatedTodo);
        return TodoModel.findOneAndUpdate({_id: id}, {$set: {text: updatedTodo}}, {new: true})
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully updated', todo)))
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    toggle(req, res) {
        return TodoModel.find({_id: id})
            .then((todo) => {
                todo.toggle = !todo.toggle;
                todo.save();
                res.json(todo);
            })
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo is toggled', todo)))
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));

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