const book = require('../domains/models/book');
const booksServices = require('../services/booksServices');
//const counter = require('./counterController');

class BookController {
    //show all books
    async getAllBooks(req, res, next) {
        try {
            // Find out why the following comment code can't run (books will get value {} instead)
            // const query = await book.find({});
            // const books = await query.exec();
            const books = await booksServices.getAllBooks().exec();
            if (books) {
                res.send(books);
            } else {
                res.send('No books found!');
            }
        } catch (err) {
            res.send(err.message);
        }
    }

    //show a book by its id
    async getBookById(req, res, next) {
        try {
            const bookToFind = await booksServices.getBookById(req.params.id);
            if (bookToFind) {
                res.send(bookToFind);
            } else {
                res.send('No book with id ' + req.params.id + ' found!');
            }
        } catch (err) {
            res.send(err.message);
        }
    }

    //store new book
    async addBook(req, res, next) {
        //res.send(req.body);
        // if (await counter.isMax('book')) {
        //     res.send('Book reached max!');
        //     return;
        // }

        const books = await book.countDocuments(req.body);
        if (books > 0) {
            res.send('Book already exists!');
            return;
        }

        try {
            await booksServices.storeNewBook(req.body);
            res.send('Update book successfully!');
            //res.redirect('/');
        } catch (err) {
            res.send(err.message);
        }
    }

    //update a book
    async updateById(req, res, next) {
        try {
            const ressult = await booksServices
                .updateById(req.params.id, req.body)
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
                //counter.descCounter('book');
            } else {
                res.send('Book not existed');
            }
        } catch (err) {
            res.send(err.message);
        }
    }
}

module.exports = new BookController();
