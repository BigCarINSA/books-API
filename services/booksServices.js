const book = require('../domains/models/book');

async function getBookByFilter(filter) {
    return book.find(filter).exec();
}

async function getAllBooks() {
    const filter = {};
    return getBookByFilter(filter);
}

async function getBookById(id) {
    return book.findById(id).exec();
}

async function storeNewBook(body) {
    const newBook = new book(body);
    newBook.save();
    //counter.incCounter('book');
}

async function updateById(id, body) {
    return book.updateOne({ _id: id }, body).exec();
}

async function buyBookById(id, quantity) {
    const bookBuy = await getBookById(id);
    if (bookBuy.numberBook > quantity) {
        bookBuy.numberBook -= quantity;
        await updateById(id, bookBuy);
        return bookBuy;
    } else {
        return false;
    }
}

module.exports = {
    getBookByFilter,
    getBookById,
    getAllBooks,
    storeNewBook,
    updateById,
    buyBookById,
};
