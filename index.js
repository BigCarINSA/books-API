const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

// conect to database
mongoose
    .connect('mongodb://127.0.0.1:27017/books_managements_dev')
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('err');
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
