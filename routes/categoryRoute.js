import { Router } from 'express'
import { getCategories, createCategory, getCategoryById, getCategoryByName, createCategories, deleteAllCategories } from '../controllers/categoryController.js'
// import verifyToken from '../middleware/verify.js'
// import checkAdmin from '../middleware/checkAdmin.js'

// We create the category router
const categoryRouter = Router()

// We defined the different routes
categoryRouter.get('/categories', getCategories) // It get all the categories 

categoryRouter.get('/categories/:categoryID', getCategoryById) // It get a category based on a id

// categoryRouter.put('/categories/:categoryID', updateCategory) // It update a category based on a id

categoryRouter.get('/category/', getCategoryByName) // It get a category based on a name

// categoryRouter.post('/category', verifyToken, checkAdmin, createCategory) // It create a category

categoryRouter.post('/categories', createCategories) // It create categories based on the fake data we have in our file '../data/categoriesData.js'

categoryRouter.delete('/categories', deleteAllCategories) // It delete all the categories

export default categoryRouter
