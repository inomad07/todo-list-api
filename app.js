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

app.use('/api/', apiRoutes);

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//app.use('/', express.static(path.join(__dirname, '/app')));

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port, () => {
    console.log(`todo list RESTful API server started on:  ${port}`);
});

