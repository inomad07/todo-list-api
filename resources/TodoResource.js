const TodoModel = require('../models/Todo');
const clientResponse = require('../helpers/SendResponse');

class TodoResource {

    getAll(req, res) {
        console.log('getAll: ', req);

        TodoModel.find({}, (err, todo) => {
            if (err){
                res.send(err);
            }

            res.json(todo);
        })
            .then(todos => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo list successfully received', todos)))
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    get(req, res) {
        let todoId = req.params.todoId;
        TodoModel.findById(todoId, (err, todo) => {
            if (err) {
                res.send(err);
            }

            res.json(todo);
        })
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully received', todo)))
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }

    create(req, res) {
        console.log('create req: ', req.body);
        let params = req.body;
        let todoModel = new TodoModel(params);
        todoModel.save( (err, todo) => {
            if (err) {
                res.send(err);
            }

            res.json(todo);
        })
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully created', todo)))
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }


    update(req, res) {
        let todoId =  req.params.todoId;
        TodoModel.findOneAndUpdate({_id: todoId}, req.body, {new: true}, (err, todo) => {
            if (err) {
                res.send(err);
            }

            res.json(todo);
        })
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully updated', todo)))
            .catch(err => res.status(500).json(clientResponse.sendErrorMsg(err)));
    }

    editTodo() {
        let todoId =  req.params.todoId;
        TodoModel.findById(todoId)
            .then((todo) => {
                todo.toggle = !todo.toggle;
                return todo.save();
            })
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully edited', todo)))
            .catch((err) => res.status(500).json(err));
    }

    delete(req, res) {
        let todoId =  req.params.todoId;
        TodoModel.remove({
            _id: todoId
        }, (err, todo) => {
            if (err) {
                res.send(err);
            }

            res.json(todo);
        })
            .then(todo => res.status(200).json(clientResponse.sendSuccessMsg('ok', 'Todo successfully removed', todo)))
            .catch((err) => res.status(500).json(err));
    }
}



module.exports = new TodoResource();
