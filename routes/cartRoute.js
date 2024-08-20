import { Router } from "express";
import { createCart, getAllCarts, updateCart, getCartByUserID, deletedProductFromCart } from "../controllers/cartController.js";

const cartRouter = Router()

cartRouter.get('/carts', getAllCarts)

cartRouter.get('/cart/user/:userID', getCartByUserID)

cartRouter.post('/cart', createCart)

cartRouter.delete('/cart/:userId/product/:productId', deletedProductFromCart)

cartRouter.put('/cart/:cartId', updateCart)

export default cartRouter