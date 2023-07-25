var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');

var indexRouter = require('./routes/index');
var inventoryRouter = require('./routes/inventory');

const connect = require("./database/database");
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'test') {
    connect.connectToDatabase();
}

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);

module.exports = app;
