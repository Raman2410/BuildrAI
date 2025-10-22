import express from 'express'
import { getUserById, getUserResume, login, register } from '../controllers/userController.js'
import protect from '../middlewares/authMiddlewares.js';

const userRouter = express.Router()

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/data',protect,getUserById);
userRouter.get('/resumes',protect,getUserResume);

export default userRouter;