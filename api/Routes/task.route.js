import express from 'express'
import { create, getAll, getOne, remove, update } from '../Controllers/task.controller.js'
import { isLogin } from './../Middlewares/isLogin.js';

const taskRouter = express.Router()
taskRouter.route('/').get(isLogin, getAll).post(isLogin, create)
taskRouter.route('/:id').get(isLogin, getOne).patch(isLogin, update).delete(isLogin, remove)
export default taskRouter