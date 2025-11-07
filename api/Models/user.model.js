import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        requierd: [true, 'username is required']
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true })
const User = mongoose.model('User', userSchema)
export default User