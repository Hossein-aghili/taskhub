import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/user.model.js";

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req.query, req.role)
        .filter()
        .populate()
        .paginate()
        .limitFields()
        .sort()
    const users = await features.execute()
    const count = await User.countDocuments(req.query)
    return res.status(200).json({
        success: true,
        data: users,
        count,
        message: 'users successfully'
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (req.role !== 'admin' && req.userId !== id) {
        return next(new HandleERROR('you dont have permission'), 401)
    }
    const user = await User.findById(id)
    if (!user) {
        return next(new HandleERROR('user not fund'), 404)
    }
    return res.status(200).json({
        success: true,
        data: user,
        message: 'user successfully'
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (req.role !== 'admin' && req.userId !== id) {
        return next(new HandleERROR('you dont have permission'), 401)
    }
    let user
    if (req.role === 'admin') {
        const { password = null, ...others } = req.body
        user = await User.findByIdAndUpdate(id, others, {
            new: true,
            runValidators: true
        })
    } else {
        const { password = null, role = null, ...others } = req.body
        user = await User.findByIdAndUpdate(id, others, {
            new: true,
            runValidators: true
        })
    }
    return res.status(200).json(({
        success: true,
        data: user,
        message: 'update successfully'
    }))
})