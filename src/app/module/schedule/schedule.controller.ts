import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { scheduleServices } from "./schedule.service";
import { Request, Response } from "express"
import { IQueryParams } from "../../interfaces/query.interface";

const createSchedule = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await scheduleServices.createSchedule(payload);
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Schedule created successfully",
            data: result
        })
    }
)

const getAllSchedules = catchAsync(
    async (req: Request, res: Response) => {
        const query = req.query;
        const result = await scheduleServices.getAllSchedules(query as IQueryParams);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Schedules retrieved successfully",
            data: result.data,
            meta: result.meta,
        })
    }
)

const getSheduleById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await scheduleServices.getScheduleById(id as string);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Schedule retrieved successfully",
            data: result
        })
    }
)

const updateScheduleById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;

        const result = await scheduleServices.updateScheduleById(id as string, payload);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Schedule updated successfully",
            data: result
        })
    }
)

const deleteSchedule = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await scheduleServices.deleteSchedule(id as string);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Schedule deleted successfully",
            data: result
        })
    }
)

export const scheduleControllers = {
    createSchedule,
    getAllSchedules,
    getSheduleById,
    updateScheduleById,
    deleteSchedule
}