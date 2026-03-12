const Book = require('../models/Book');

// @desc    Add a new book
// @route   POST /books
// @access  Public
const addBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Get all book records
// @route   GET /books
// @access  Public
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Get book by ID
// @route   GET /books/:id
// @access  Public
const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        // If it's an invalid Object ID, it throws a CastError
        if (error.name === 'CastError') {
            res.status(404);
            error.message = 'Book not found';
        } else {
            res.status(500);
        }
        next(error);
    }
};

// @desc    Update book details
// @route   PUT /books/:id
// @access  Public
const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true } // Return modified document and run validation
            );
            res.status(200).json(updatedBook);
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404);
            error.message = 'Book not found';
        } else if (error.name === 'ValidationError') {
            res.status(400);
        }
        else {
            res.status(500);
        }
        next(error);
    }
};

// @desc    Delete book record
// @route   DELETE /books/:id
// @access  Public
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404);
            throw new Error('Book not found');
        }
    } catch (error) {
        if (error.name === 'CastError') {
            res.status(404);
            error.message = 'Book not found';
        } else {
            res.status(500);
        }
        next(error);
    }
};

// @desc    Search book by title or author
// @route   GET /books/search?title=xyz
// @access  Public
const searchBooks = async (req, res, next) => {
    try {
        const { title, author } = req.query;
        let query = {};

        if (title) {
            // Case-insensitive regex search for title
            query.Title = { $regex: title, $options: 'i' };
        }

        if (author) {
            // Case-insensitive regex search for author
            query.Author = { $regex: author, $options: 'i' };
        }

        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    searchBooks
};
