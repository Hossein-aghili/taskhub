import express from 'express'
import { login, register } from '../Controllers/auth.controller.js'
const authRouter = express.Router()
authRouter.route('/register').post(register)
authRouter.route('/login').post(login)
export default authRouter