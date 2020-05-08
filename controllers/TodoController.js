const TodoModel = require('../models/TodoModel');

const getAll = (req, res) => {
    TodoModel.find({})
        .then((todo) => {
            if (todo.length === 0) res.status(200).json({msg: 'Not found'});

            res.status(200).json(todo);
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


const create = (req, res) => {
    const newTodo = new TodoModel(req.body);
    newTodo.save()
        .then( (todo) => {
            res.status(200).json({msg: 'Todo successfully created', todo});
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


const get = (req, res) => {
    TodoModel.findById(req.params.todoId)
        .then(todo => {
            res.status(200).json(todo);
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


const update = (req, res) => {
    const id = req.params.todoId;
    TodoModel.findOneAndUpdate({_id: id}, req.body, {new: true})
        .then((todo) => {
            res.status(200).json({msg: 'Todo successfully updated', todo});
        })
        .catch(err => {
            res.status(500).json(err)
        });
};


const remove = (req, res) => {
    const id = req.params.todoId;
    TodoModel.deleteOne({_id: id})
        .then((todo) => {
            if (todo) res.status(200).json({msg: 'Todo successfully deleted', id});
        })
        .catch(err => {
            res.status(500).json(err);
        });
};


const toggle = (req, res) => {
    let id = req.params.todoId;

    TodoModel.findById(id)
        .then((todo) => {
            todo.toggle = !todo.toggle;
            return todo.save();
        })
        .then((todo) => {
            res.status(200).json({msg: 'Todo successfully toggled', todo});
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