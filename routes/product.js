const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cheems');

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String
})

module.exports = mongoose.model('product', productSchema);