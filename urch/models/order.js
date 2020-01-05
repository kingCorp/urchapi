const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    address: {type: String, required: true},
    description: {type: String},
    quantity: {type: Number, required: true},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);