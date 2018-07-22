const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const VinSchema = mongoose.Schema({
    name: String,
    vineyard : [{ type: Schema.Types.ObjectId, ref: 'Vignoble' }] ,
    image: String,
    quantity: Number,
    price: Number,
    description: String
});

module.exports = mongoose.model('Vin', VinSchema);