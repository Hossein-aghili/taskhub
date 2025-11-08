import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import morgan from 'morgan'
import taskRouter from './Routes/task.route.js'
import authRouter from './Routes/auth.route.js'
import userRouter from './Routes/user.route.js'

const __filename =fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api/task', taskRouter)
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

export default app