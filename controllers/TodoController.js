const TodoModel = require('../models/TodoModel');

exports.getAll = (req, res, next) => {
    TodoModel.find({})
        .then(todo => {
            if (todo.length === 0) {
                return res.json({msg:'Not found'})
            }
            res.status(200).json(todo);
            return next();
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


exports.create = (req, res, next) => {
    const newTodo = new TodoModel(req.body);
    newTodo.save()
        .then(todo => {
            res.status(200).json({msg: 'Todo list successfully fetched', todo});
            return next();
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


exports.get = (req, res, next) => {
    TodoModel.findById(req.params.todoId)
        .then(todo => {
            res.status(200).json(todo);
            return next();
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


exports.update = (req, res, next) => {
    TodoModel.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
        .then(todo => {
            res.status(200).json({msg: 'Todo successfully updated',todo});
            return next();
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


exports.remove = (req, res, next) => {
    TodoModel.remove({_id: req.params.todoId})
        .then(todo => {
            res.status(200).json({msg: 'Todo successfully deleted', todo});
            return next();
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


exports.toggle = (req, res, next) => {
    let id = req.params.todoId;

    TodoModel.findById(id)
        .then((todo) => {
            todo.toggle = !todo.toggle;
            return todo.save();
        })
        .then((todo) => {
            res.status(200).json({msg: 'Todo successfully toggled', todo});
            return next();
        })
        .catch((err) => res.status(500).json(err));
};
