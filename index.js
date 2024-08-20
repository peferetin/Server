import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import categoryRouter from './routes/categoryRoute.js';
import authRouter from './routes/authRoute.js';
import cartRouter from './routes/cartRoute.js';
import mailRouter from './routes/mailRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();
const PORT = process.env.PORT
mongoose.connect(process.env.MONGO_URI)


const corsOptions = {
    exposedHeaders: ['Content-Range'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('images', express.static('public/images'));



app.use('/api/', userRouter, productRouter, categoryRouter, authRouter, cartRouter, mailRouter, orderRouter);


app.get('/', (req, res) => {
    res.send('Welcome to the Luxury Store API');
}
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
