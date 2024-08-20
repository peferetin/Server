import CartModel from '../models/cartModel.js'



const getAllCarts = async (req, res) => {
    try {
        const carts = await CartModel.find()
        return res.json(carts)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const getCartByUserID = async (req, res) => {
    const { userID } = req.params
    try {
        const cart = await CartModel.findOne({ user: userID }).populate('products.product')
        return res.json(cart)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}

const createCart = async (req, res) => {
    console.log(req.body);

    const { userId, products } = req.body
    try {
        const createdCart = await new CartModel({
            user: userId,
            products: products.map(product => ({
                product: product.productId,
                quantity: product.quantity,
                price: product.price,
                name: product.name,
                size: product.size ? product.size : null,
                color: product.color ? product.color : null,


            })),
            totalPrice: products.reduce((acc, item) => acc + (item.quantity * item.price), 0)
        })

        await createdCart.save()
        return res.status(201).json(createdCart)
    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }
}
// router.delete('/cart/:userId/product/:productId', async (req, res) => {

const deletedProductFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        let cart = await CartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the product to be removed
        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        console.log(cart.products);

        // Recalculate the total price
        cart.totalPrice = cart.products.reduce((total, product) => total + product.price * product.quantity, 0);

        await cart.save();

        return res.status(200).send('Product removed from cart');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateCart = async (req, res) => {
    const { products } = req.body
    const { cartId } = req.params

    try {
        const cart = await CartModel.findById(cartId)
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' })
        }

        console.log(products)
        cart.products = products
        

        cart.totalPrice = cart.products.reduce((acc, item) => acc + (item.quantity * item.price), 0)


        await cart.save()
        res.status(200).json(cart)

    }
    catch (err) {
        console.error('Internal server error 🔴', err)
        res.status(500).json({ error: `${err.message} 🔴` })
    }


}


export { getAllCarts, getCartByUserID, createCart, updateCart, deletedProductFromCart }