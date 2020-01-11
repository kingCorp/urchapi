const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    address: {type: String, required: true},
    quantity: {type: Number, required: true},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);