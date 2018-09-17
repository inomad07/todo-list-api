const TodoModel = require('../models/Todo');
const clientResponse = require('../helpers/SendResponse');

class TodoResource {

    getAll(req, res) {
        console.log('getAll: ', req);

        TodoModel.find({}, (err, todo) => {
            if (err)
                res.send(err);

            res.json(todo);
        })

    }


    get(req, res) {
        let todoId = req.params.todoId;
        TodoModel.findById(todoId, (err, todo) => {
            if (err)
                res.send(err);

            res.json(todo);
        })

    }

    create(req, res) {
        console.log('create req: ', req.body);
        let params = req.body;
        let todoModel = new TodoModel(params);
        todoModel.save( (err, todo) => {
            if (err)
                res.send(err);


            res.json(todo);
        })

    }


    update(req, res) {
        let todoId =  req.params.todoId;
        TodoModel.findOneAndUpdate({_id: todoId}, req.body, {new: true}, (err, todo) => {
            if (err)
                res.send(err);

            res.json(todo);
        })
    }

    editTodo() {
        let todoId =  req.params.todoId;
        TodoModel.findById(todoId)
            .then((todo) => {
                todo.toggle = !todo.toggle;
                return todo.save();
            })
    }

    delete(req, res) {
        let todoId =  req.params.todoId;
        TodoModel.remove({
            _id: todoId
        }, (err, todo) => {
            if (err)
                res.send(err);

            res.json(todo);
        })
    }
}



module.exports = new TodoResource();
