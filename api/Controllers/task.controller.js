import { catchAsync } from "vanta-api";
import Task from "../Models/task.model.js";

export const create = catchAsync(async (req, res, next) => {
    const task = await Task.create({ ...req.body, userId: req.userId })
    return res.status(200).json({
        success: true,
        data: task,
        message: 'task successfully'
    })
})
