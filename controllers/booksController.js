const book = require('../domains/models/book');
const counter = require('./counterController');
const express = require('express');

class BookController {
    //show all books
    async show(req, res, next) {
        try {
            // Find out why the following comment code can't run (books will get value {} instead)
            // const query = await book.find({});
            // const books = await query.exec();
            const books = await book.find({}).exec();
            res.send(books);
        } catch (err) {
            res.send(err.message);
        }
    }

    //show a book by its id
    async showById(req, res, next) {
        try {
            const bookToFind = await book.findById(req.params.id).exec();
            res.send(bookToFind);
        } catch (err) {
            res.send(err.message);
        }
    }

    //store new book
    async store(req, res, next) {
        //res.send(req.body);
        if (await counter.isMax('book')) {
            res.send('Book reached max!');
            return;
        }

        const books = await book.countDocuments(req.body);
        if (books > 0) {
            res.send('Book already exists!');
            return;
        }

        try {
            const newBook = new book(req.body);
            await newBook.save();
            counter.incCounter('book');
            res.send('Update book successfully!');
            //res.redirect('/');
        } catch (err) {
            res.send(err.message);
        }
    }

    //update a book
    async updateById(req, res, next) {
        try {
            const ressult = await book
                .updateOne({ _id: req.params.id }, req.body)
                .exec();
            if (ressult.modifiedCount === 1) {
                res.send('Edit book successfully!');
            } else {
                res.send('Book not existed');
            }
        } catch (err) {
            res.send(err.message);
        }
    }

    //delete a book
    async deleteById(req, res, next) {
        try {
            const ressult = await book.deleteOne({ _id: req.params.id }).exec();
            if (ressult.deletedCount === 1) {
                res.send('Book deleted successfully!');
                counter.descCounter('book');
            } else {
                res.send('Book not existed');
            }
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = new BookController();
