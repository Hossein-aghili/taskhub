import { HandleERROR } from "vanta-api";
import User from "../Models/user.model.js";
import { catchAsync } from './../node_modules/vanta-api/src/catchAsync';
import bcryptjs from "bcryptjs";
export const regiter = catchAsync(async (req, res, next) => {
    const {password = null , role = null ,...others} = req.body
    if(!password){
        return next(new HandleERROR('password or username is required'))
    }
    const regexPass = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    if (!regexPass.test(password)){
        return next(new HandleERROR('password invalid', 400))
    }
    const hashPass = await bcryptjs.hash(password,10)

    const user = await User.create({ ...others,password:hashPass,})
    if(!user){
        return next(new HandleERROR('user not found'))
    }
    return res.status(200).json({
        success:true,
        data:user,
        message:'register successfully'
    })
})
