import express from 'express'
import { getAll, getOne, update } from '../Controllers/user.controller.js';
import { isAdmin } from '../Middlewares/isAdmin.js';
import { isLogin } from '../Middlewares/isLogin.js';
const userRouter = express.Router()
userRouter.route('/').get(isAdmin, getAll)
userRouter.route('/:id').get(isLogin, getOne).patch(isAdmin, update)
export default userRouter