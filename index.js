const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8000;
const dbURL =
    process.env.DB_URL || 'mongodb://127.0.0.1:27017/books_managements_dev';

// conect to database
mongoose
    .connect(dbURL)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log(err.message);
    });

//body parser middleware
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true })); //for methode POST/GET send by html forms)
// app.use(express.json()); //for json data

//listen on route
route(app);

app.listen(port, () => {
    console.log('listening on port ' + port);
});
