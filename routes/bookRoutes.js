const express = require('express');
const router = express.Router();

const {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
} = require('../controllers/bookController');

// Define routes (order matters: search must come before /:id)
router.route('/search').get(searchBooks);
router.route('/').post(addBook).get(getAllBooks);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
