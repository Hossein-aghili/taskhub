import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import Task from "../Models/task.model.js";

export const create = catchAsync(async (req, res, next) => {
    const task = await Task.create({ ...req.body, userId: req.userId })
    return res.status(200).json({
        success: true,
        data: task,
        message: 'task successfully'
    })
})

export const getAll = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Task, req.query, req.role)
        .filter()
        .addManualFilters(req.role !== 'andim' ? { userId: req.userId } : {})
        .sort()
        .populate()
        .paginate()
        .limitFields()
    const user = await features.execute()
    const count = await Task.countDocuments(features.queryFilter)
    return res.status(200).json({
        success: true,
        data: user,
        count,
    })
})
export const getOne = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
        return next(new HandleERROR('تسک مورد نظر یافت نشد'))
    }
    if (req.role !== "admin" && task.userId.toString() !== req.userId.toString()) {
        return next(new HandleERROR("شما اجازه دسترسی به این را ندارید", 401))
    }
    return res.status(200).json({
        success: true,
        data: user,
    })
})

export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!task) {
        return next(new HandleERROR('تسک مورد نظر یافت نشد'))
    }
    if (req.role !== 'admin' && task.userId.toString() !== req.userId.toString()) {
        return next(new HandleERROR("شما اجازه دسترسی به این را ندارید", 401))
    }
    return res.status(200).json({
        success: true,
        data: user,
    })
})