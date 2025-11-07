import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'description is requierd'],
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'done'],
        default: 'pending'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps:true})
const Task =mongoose.model('Task',taskSchema)
export default Task