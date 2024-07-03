require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require('cors'); // Importer cors



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const scrapRecetteRouter = require('./routes/recette');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

mongoose.connect(process.env.DATABASE_URL).then(() => {console.log("Connected with data base")})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recette', scrapRecetteRouter);

module.exports = app;
