const mongoose = require('mongoose');

const userOrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', userOrderSchema);