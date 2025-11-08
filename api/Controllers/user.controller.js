import ApiFeatures, { catchAsync } from "vanta-api";
import User from "../Models/user.model.js";

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req.query, req.role)
        .filter()
        .populate()
        .limitFields()
        .paginate()
        .sort()
    const users = await features.execute()
    const count = await User.countDocuments(features.queryFilter)
    return res.status(200).json({
        success: true,
        data: users,
        count
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (req.role !== 'admin' && req.userId !== id) {
        return next(new HandleERROR("you don't have permission", 401))
    }
    const user = await User.findById(id)
    return res.status(200).json({
        success: true,
        data: user,
    })
})
export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    if (req.role !== 'admin' && req.userId !== id) {
        return next(new HandleERROR("you don't have permission", 401))
    }
    let user;
    if (req.role === 'admin') {
        const { password = null, ...others } = req.body
        user = await User.findByIdAndUpdate(id, o, {
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
    return res.status(200).json({
        success: true,
        data: user
    })
})