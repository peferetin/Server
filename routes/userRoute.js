import express from 'express';
import { getUsers, getUserById, getUserByName, getUserByToken, updateUser, deleteUser, } from '../controllers/userController.js';
const userRouter = express.Router();


userRouter.get('/users', getUsers);

userRouter.get('/users/:id', getUserById);

userRouter.get('/users/name/:name', getUserByName);

userRouter.post('/users/token', getUserByToken);

userRouter.put('/users/:userId', updateUser);

userRouter.delete('/users/:userId', deleteUser);



export default userRouter;