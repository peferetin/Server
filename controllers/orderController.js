import Order from '../models/orderModel.js'
import Cart from '../models/cartModel.js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createOrder = async (req, res) => {

    const { userId, paymentMethodId } = req.body
    try {
        const cart = await Cart.findOne({ user: userId })
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: cart.totalPrice * 100,
            currency: 'usd',
            payment_method: paymentMethodId
        })

        

        if (paymentIntent.status == 'declined') {
            return res.status(400).json({ error: 'Payment failed' })
        }

        const orderData = cart.products.map(product => ({
            product: product.product,
            quantity: product.quantity,
            price: product.price,
            name: product.name,
            size: product.size[0],  
            color: product.color[0]
        }));

        const newOrder = new Order({
            products: orderData,
            user: userId,
            paymentDetails: paymentIntent,
            totalPrice: cart.totalPrice
        })

        await newOrder.save()
        await Cart.findOneAndDelete(cart._id)
        res.status(201).json(newOrder)
    }

    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        if (orders.length < 1) {
            return res.status(404).json({ error: 'No orders found' })
        }
        const ordersCount = await Order.countDocuments()
        res.set('Content-Range', `orders 0-${orders.length}/${ordersCount}`)
        return res.status(200).json(orders)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}


// GET ORDER BY ID 

const getOrderById = async (req, res) => {
    const { orderId } = req.params

    try {
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ error: 'Order not found' })
        }

        return res.status(200).json(order)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const getOrderByUserId = async (req, res) => {

    const { userId } = req.params

    try {
        const orderByUserID = await Order.find({ user: userId })
        if (!orderByUserID) {
            return res.status(404).json({ error: 'Order not found' })
        }
        return res.status(200).json(orderByUserID)

    }

    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}
const deleteOrders = async (req, res) => {
    try {
        await Order.deleteMany()
        res.status(200).json({ message: 'All orders deleted' })
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}


const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params
    const { status } = req.body
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' })
        }
        return res.status(200).json(updatedOrder)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}



export { createOrder, getOrderById, getOrderByUserId, updateOrderStatus, getAllOrders, deleteOrders }

