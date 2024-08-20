import { Router } from 'express'
import { sendEmail } from '../controllers/emailController.js'



const mailRouter = Router()


mailRouter.post('/send-email', sendEmail)

export default mailRouter