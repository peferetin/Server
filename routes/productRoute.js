import { Router } from 'express'
import { getProducts, getProductById, getProductByName, getProductsByCategory, createProduct, deleteAllProducts, createProducts, updateProduct } from '../controllers/productController.js'
import upload from '../middlewares/upload.js'

const productRouter = Router()



productRouter.get('/products', getProducts) // It get all the products

productRouter.get('/products/:productID', getProductById) // It get the product by its ID

productRouter.get('/product', getProductByName) // It get the product by its name

productRouter.get('/products/categories/:categoryID', getProductsByCategory) // It get all the products based on the category ID

productRouter.post('/product', createProduct) // It create a product

productRouter.post('/products', upload.single('public/images'), createProducts) // It create products

productRouter.put('/products/:productID', upload.single('public/images'), updateProduct) // It update the product by its ID

productRouter.delete('/products', deleteAllProducts) // It delete all the products


export default productRouter