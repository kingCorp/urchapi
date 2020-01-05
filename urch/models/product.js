const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    categories: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    images: { type: Schema.Types.ObjectId, ref: 'Image' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);