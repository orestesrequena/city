const mongoose = require('mongoose');


const VignobleSchema = mongoose.Schema({
    name:        String,
    image:       String,
    email:       String,
    phone:       Number,
    address:     String,
    description: String,
    latitude:    Number,
    longitude:   Number,
});

module.exports = mongoose.model('Vignoble', VignobleSchema);