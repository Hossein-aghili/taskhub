import ApiFeatures, { catchAsync } from "vanta-api";
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
        success:true,
        data:user,
        count,
    })
})