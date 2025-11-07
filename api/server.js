import app from "./app.js";
import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'
import { __dirname } from './app.js';

dotenv.configDotenv({ path: __dirname + '/config.env' })
mongoose.connect(process.env.DATA_BASE).then(() => {
    console.log('DB is connected')
}).catch((error) => {
    console.log(error)
})

app.listen(process.env.PORT , ()=>{
    console.log('server is running')
})