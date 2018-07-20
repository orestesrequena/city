const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: String,
    content: String

});

module.exports = mongoose.model('News', NewsSchema);