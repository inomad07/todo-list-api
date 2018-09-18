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
  console.log(req.body);
  const new_task = new Task(req.body);
  new_task.save( (err, task) => {
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
  });
};


exports.update_a_task = (req, res) => {
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
    res.status(200).json({ message: 'Task successfully deleted', task });
    return next();
  });
};


exports.change_state = (req, res, next) => {
    Task.findById(req.params.todoId)
        .then((task) => {
            task.toggle = !task.toggle;
            task.save();
        })
        .then((task) => {
          res.status(200).json(task)
        })
        .catch((err) => res.status(500).json(err));
};
