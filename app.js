// require('dotenv').config({path: `${__dirname}/.env`});
require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const apiRouter  = require('./routes/api');

//Local imports
const app = express();
const PORT = process.env.PORT;


const MONGO_DB = process.env.MONGO_DB;
const HOST = process.env.MONGO_HOST;

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${HOST}/${MONGO_DB}`, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',  () => {
    console.log('MongoDB Connected');
});


app.use(bodyParser.json());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, () => {
    console.log(`started at port ${PORT}`);
});


exports = module.exports = app;