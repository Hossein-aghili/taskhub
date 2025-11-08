import ApiFeatures, { HandleERROR } from "vanta-api";
import { catchAsync } from 'vanta-api'
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
    const filterObj = req.role !== "admin" ? { userId: req.userId } : {};
    const features = new ApiFeatures(Task, req.query)
        .addManualFilters(filterObj)
        .filter()
        .sort()
        .populate()
        .paginate()
        .limitFields()

    const tasks = await features.execute()
    const count = await Task.countDocuments(features.queryFilter)

    return res.status(200).json({
        success: true,
        data: tasks,
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
        data: task,
    })
})

export const update = catchAsync(async (req, res, next) => {
    const { id } = req.params
    
    const task = await Task.findById(id)
    if (!task) {
        return next(new HandleERROR('تسک مورد نظر یافت نشد'))
    }
    if (req.role !== "admin" && task.userId.toString() !== req.userId.toString()) {
        return next(new HandleERROR("شما اجازه دسترسی به این را ندارید", 401))
    }
    const updateTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    return res.status(200).json({
        success: true,
        data: updateTask,
    })
})
export const remove = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) return next(new HandleERROR("تسک مورد نظر یافت نشد", 404));

    if (req.role !== "admin" && task.userId.toString() !== req.userId.toString()) {
        return next(new HandleERROR("شما اجازه حذف این تسک را ندارید", 401));
    }

    await task.deleteOne();

    return res.status(200).json({
        success: true,
        message: "تسک با موفقیت حذف شد",
    });
});