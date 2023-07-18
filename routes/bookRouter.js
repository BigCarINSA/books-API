const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

router.get('/', booksController.getAllBooks);
router.post('/store', booksController.addBook);
router.get('/:id', booksController.getBookById);
router.put('/:id/update', booksController.updateById);
router.delete('/:id', booksController.deleteById);

module.exports = router;
