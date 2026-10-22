import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { Request, Response } from "express"
import { IQueryParams } from "../../interfaces/query.interface";
import { doctorScheduleServices } from "./doctorSchedule.service";

const createMyDoctorSchedule = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const user = req.user;
        const result = await doctorScheduleServices.createMyDoctorSchedule(user, payload);
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Doctor schedule created successfully",
            data: result
        })
    }
)

const getMyDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const query = req.query;
    const result = await doctorScheduleServices.getMyDoctorSchedules(user, query as IQueryParams);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Doctor schedules retrieved successfully',
        data: result.data,
        meta: result.meta
    });
});

const getAllDoctorSchedules = catchAsync(
    async (req: Request, res: Response) => {
        const query = req.query;
        const result = await doctorScheduleServices.getAllDoctorSchedules(query as IQueryParams);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "All Doctor schedules retrieved successfully",
            data: result.data,
            meta: result.meta,
        })
    }
)

const getDoctorSheduleById = catchAsync(async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId;
    const scheduleId = req.params.scheduleId;
    const result = await doctorScheduleServices.getDoctorScheduleById(doctorId as string, scheduleId as string);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor schedule retrieved successfully",
        data: result
    });
});

const updateMyDoctorSchedule = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const user = req.user;

        const result = await doctorScheduleServices.updateMyDoctorSchedule(user, payload);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor schedule updated successfully",
            data: result
        });
    });

const deleteMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user;
    const result = await doctorScheduleServices.deleteMyDoctorSchedule(id as string, user);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor schedule deleted successfully",
        data: result
    })
})

export const doctorScheduleControllers = {
    createMyDoctorSchedule,
    getMyDoctorSchedules,
    getAllDoctorSchedules,
    getDoctorSheduleById,
    updateMyDoctorSchedule,
    deleteMyDoctorSchedule
}