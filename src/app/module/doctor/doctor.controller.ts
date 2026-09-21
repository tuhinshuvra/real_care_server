import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { doctorServices } from "./doctor.service";
import { Request, Response } from "express"

const getAllDoctors = catchAsync(
    async (req: Request, res: Response) => {
        const result = await doctorServices.getAllDoctors();
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctors retrieved successfully",
            data: result
        })
    }
)

const getDoctorById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await doctorServices.getDoctorById(id as string);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor retrieved successfully",
            data: result
        })
    }
)

const updateDoctorById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;
        const result = await doctorServices.updateDoctorById(id as string, payload);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor updated successfully",
            data: result
        })
    }
)

const deleteDoctorById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await doctorServices.deleteDoctorById(id as string);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor deleted successfully",
            data: result
        })
    }
)

export const doctorControllers = {
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
    deleteDoctorById
}