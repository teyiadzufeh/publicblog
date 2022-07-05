const mongoose = require('mongoose');

const blogPostSchemma = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },
    ingredients: {
        type: Array,
        required: 'This field is required.'
    },
    category: {
        type: String,
        enum: ['Ebun','Cloud', 'Star', 'Mogbo', 'Timi'],
        required: 'This field is required'
    },
    image: {
        type: String,
        required: 'This field is required.'
    },
});

module.exports = mongoose.model('BlogPost', blogPostSchemma);