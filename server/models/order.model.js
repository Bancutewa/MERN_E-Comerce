const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        count: Number,
        color: String,
    }
    ],
    status: {
        type: String,
        default: 'Processing',
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Succeeded'],
    },
    total: Number,
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
    }
}, {
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);