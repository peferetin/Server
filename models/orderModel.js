import mongoose, { Schema } from 'mongoose'



const orderSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: {
            type: Number,
            required: true

        },
        price: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },

        size: {
            type: String,
        },
        color: {
            type: String
        }
    }],


    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },

    paymentDetails: {
        type: Object,
    },

    totalPrice: {
        type: Number,
        required: true
    }

})
const Order = mongoose.model('Order', orderSchema)
export default Order