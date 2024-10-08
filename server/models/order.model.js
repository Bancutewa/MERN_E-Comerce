const mongoose = require('mongoose');

var orderSchema = new mongoose.OrderSchema({
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
    paymentIntent: {},
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);