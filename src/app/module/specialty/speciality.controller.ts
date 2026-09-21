/* eslint-disable @typescript-eslint/no-explicit-any */
import { Speciality } from "../../../generated/prisma/client"
import { Request, Response } from "express"
import { specialityService } from "./speciality.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createSpeciality = catchAsync(
    async (req: Request, res: Response) => {
        const payload: Speciality = req.body;
        const result = await specialityService.createSpeciality(payload);
        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Speciality created successfully",
            data: result
        })
    }
)

const getAllSpeciality = catchAsync(
    async (req: Request, res: Response) => {
        const result = await specialityService.getAllSpeciality();
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Specialities retrieved successfully",
            data: result
        })
    }
)

const deleteOneSpeciality = catchAsync(
    async (req: Request, res: Response) => {

        const { id } = req.params;
        const result = await specialityService.deleteOneSpeciality(id as string);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Speciality deleted successfully",
            data: result
        })
    }
)

const findOneSpeciality = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await specialityService.findOneSpeciality(id as string);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Speciality retrieved successfully",
            data: result
        })
    }
)

const updateOneSpeciality = catchAsync(
    async (req: Request, res: Response) => {

        const { id } = req.params;
        const payload: Speciality = req.body;
        const result = await specialityService.updateOneSpeciality(id as string, payload);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Speciality updated successfully",
            data: result
        })
    }
)

export const specialityController = {
    createSpeciality,
    getAllSpeciality,
    findOneSpeciality,
    updateOneSpeciality,
    deleteOneSpeciality
}