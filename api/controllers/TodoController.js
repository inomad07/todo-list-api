const mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

exports.list_all_tasks = (req, res, next) => {
    Task.find({}, (err, task) => {
        if (err)
            res.send(err);
        res.status(200).json(task);
        return next();
    });
};


exports.create_a_task = (req, res, next) => {
    const new_task = new Task(req.body);
    new_task.save((err, task) => {
        if (err)
            res.send(err);
        res.status(200).json(task);
        return next();
    });
};


exports.read_a_task = (req, res, next) => {
    Task.findById(req.params.todoId, (err, task) => {
        if (err)
            res.send(err);
        res.status(200).json(task);
        return next();
    });
};


exports.update_a_task = (req, res, next) => {
    Task.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true}, (err, task) => {
        if (err)
            res.send(err);
        res.status(200).json(task);
        return next();
    });
};


exports.delete_a_task = (req, res, next) => {
    Task.remove({
        _id: req.params.todoId
    }, (err, task) => {
        if (err)
            res.send(err);
        res.status(200).json({message: 'Task successfully deleted', task});
        return next();
    });
};


exports.change_state = (req, res, next) => {
    let id = req.params.todoId;

    Task.findById(id)
        .then((todo) => {
            todo.toggle = !todo.toggle;
            return todo.save();
        })
        .then((todo) => {
            res.status(200).json(todo);
            return next();
        })
        .catch((err) => res.status(500).json(err));
};
