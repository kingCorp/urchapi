const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    products: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    filePath : {type: String, required: true},
    fileName : {type: String, },
    fileType : {type: String, },
    fileSize : {type: String, },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', imageSchema);