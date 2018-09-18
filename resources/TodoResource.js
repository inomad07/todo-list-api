const TodoModel = require('../models/Todo');
const clientResponse = require('../helpers/SendResponse');

class TodoResource {

    getAll(req, res, next) {
        console.log('getAll: ', req);

        TodoModel.find({}, (err, todo) => {
            if (err)
                res.send(err);
            res.json(todo);
            return next();
        })

    }


    get(req, res, next) {
        let todoId = req.params.todoId;
        TodoModel.findById(todoId, (err, todo) => {
            if (err)
                res.send(err);
            res.json(todo);
            return next();
        })

    }

    create(req, res, next) {
        console.log('create req: ', req.body);
        let params = req.body;
        let todoModel = new TodoModel(params);
        todoModel.save( (err, todo) => {
            if (err)
                res.send(err);
            res.json(todo);
            return next();
        })

    }


    update(req, res, next) {
        let todoId =  req.params.todoId;
        TodoModel.findOneAndUpdate({_id: todoId}, req.body, {new: true}, (err, todo) => {
            if (err)
                res.send(err);
            res.json(todo);
            return next();
        })
    }

    editTodo(req, res, next) {
        let todoId =  req.params.todoId;
        TodoModel.findById(todoId)
            .then((todo) => {
                todo.toggle = !todo.toggle;
                todo.save();
                res.json(todo);
                return next();
            })
    }

    delete(req, res, next) {
        let todoId =  req.params.todoId;
        TodoModel.remove({
            _id: todoId
        }, (err, todo) => {
            if (err)
                res.send(err);
            res.json(todo);
            return next();
        })
    }
}



module.exports = new TodoResource();
