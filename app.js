const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/api');
const db = mongoose.connection;
const port = process.env.PORT || 3001;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TodoList', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('MongoDB Connected!');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port, () => {
    console.log(`Server started on localhost:${port}`);
});