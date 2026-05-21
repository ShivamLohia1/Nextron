import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: Array,
        default: []
    },
    total: {
        type: Number,
        required: true
    },
    customerInfo: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'Processing'
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
