const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, 'Please add a book title']
    },
    ISBN: {
        type: String,
        required: [true, 'Please add an ISBN'],
        unique: true
    },
    Author: {
        type: String,
        required: [true, 'Please add an author']
    },
    TotalCopies: {
        type: Number,
        required: [true, 'Please add total copies'],
        min: [1, 'Total copies must be a positive number']
    },
    Genre: {
        type: String,
        required: [true, 'Please add a genre']
    },
    Publisher: {
        type: String,
        required: [true, 'Please add a publisher']
    },
    PublicationYear: {
        type: Number
    },
    AvailableCopies: {
        type: Number,
        min: [0, 'Available copies cannot be negative']
    },
    ShelfLocation: {
        type: String
    },
    BookType: {
        type: String,
        enum: ['Reference', 'Circulating'],
        default: 'Circulating'
    },
    Status: {
        type: String,
        enum: ['Available', 'Checked Out'],
        default: 'Available'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
