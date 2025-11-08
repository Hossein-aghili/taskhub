import { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = catchAsync(async (req, res, next) => {
    const { password = null, role = null, ...others } = req.body
    if (!password) {
        return next(new HandleERROR('password or username is required'))
    }
    const regexPass = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    if (!regexPass.test(password)) {
        return next(new HandleERROR('password invalid', 400))
    }
    const hashPass = await bcryptjs.hash(password, 10)

    const user = await User.create({ ...others, password: hashPass, })
    if (!user) {
        return next(new HandleERROR('user not found'))
    }
    return res.status(200).json({
        success: true,
        data: user,
        message: 'register successfully'
    })
})
export const login = catchAsync(async (req, res, next) => {
    const { username = null, password = null } = req.body
    if (!username || !password) {
        return next(new HandleERROR('username and password is required', 400))
    }
    const user = await User.findOne({ username })
    if (!user) {
        return next(new HandleERROR('user not found'))
    }
    const checkPassword = bcryptjs.compareSync(password, user.password)
    if (!checkPassword) {
        return next(new HandleERROR('username or password incorrect', 400))
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
    return res.status(200).json({
        success: true,
        data: {
            id: user._id,
            role: user.role,
            username: user.username,
            token

        },
        message: 'register successfully'
    })
})