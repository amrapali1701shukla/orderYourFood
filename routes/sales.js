const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
    order:mongoose.Schema.Types.Mixed,
    isCompleted: {
      type: Boolean,
      default: false
    },
    price: Number,
    contactNumber: String,
    address: String
})

module.exports = mongoose.model('sale', saleSchema);