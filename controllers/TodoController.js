const TodoModel = require('../models/TodoModel');

const getAll = (req, res, next) => {
    TodoModel.find({})
        .then((todo) => {
            if (todo.length === 0) {
                res.status(200).json({msg: 'Not found'});
                return next();
            }
            res.status(200).json(todo);
            return next();
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


const create = (req, res, next) => {
    const newTodo = new TodoModel(req.body);
    newTodo.save()
        .then( (todo) => {
            res.status(200).json({msg: 'Todo successfully created', todo});
            return next();
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


const get = (req, res, next) => {
    TodoModel.findById(req.params.todoId)
        .then(todo => {
            res.status(200).json(todo);
            return next();
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


const update = (req, res, next) => {
    TodoModel.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
        .then((todo) => {
            res.status(200).json({msg: 'Todo successfully updated', todo});
            return next();
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


const remove = (req, res, next) => {
    const id = req.params.todoId;
    TodoModel.deleteOne({_id: id})
        .then((todo) => {
            if (todo) res.status(200).json({msg: 'Todo successfully deleted', id});
            return next();
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


const toggle = (req, res, next) => {
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


module.exports = {
    getAll,
    create,
    get,
    update,
    remove,
    toggle,
};