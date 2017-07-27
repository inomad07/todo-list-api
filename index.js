const express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'),
  apiRoutes = require('./api/routes/todoListRoutes'),
  bodyParser = require('body-parser'),
  path = require('path');

  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', { useMongoClient: false }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/tasks', apiRoutes);

//app.use('/', express.static(path.join(__dirname, '/app')));

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});



app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
