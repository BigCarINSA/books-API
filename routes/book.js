const express = require('express');
const router = express.Router();

const booksController = require('../controllers/booksController');

router.get('/', booksController.show);
router.post('/store', booksController.store);
router.get('/:id', booksController.showById);
router.put('/:id/update', booksController.updateById);
router.delete('/:id', booksController.deleteById);

module.exports = router;
