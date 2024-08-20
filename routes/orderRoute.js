

import { Router } from 'express'
import { createOrder, getOrderById, getOrderByUserId, updateOrderStatus, getAllOrders, deleteOrders } from '../controllers/orderController.js'
const orderRouter = Router()


orderRouter.post('/order', createOrder)

orderRouter.get('/orders', getAllOrders)

orderRouter.get('/orders/:orderId', getOrderById)

orderRouter.get('/order/user/:userId', getOrderByUserId)

orderRouter.delete('/orders', deleteOrders)

orderRouter.put('/orders/:orderId', updateOrderStatus)

export default orderRouter

