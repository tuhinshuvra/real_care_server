/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express"
import { userServices } from "./user.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";

const createDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await userServices.createDoctor(payload);

        sendResponse(res, {
            httpStatusCode: status.CREATED,
            success: true,
            message: "Doctor registered successfully",
            data: result
        })
    }
)


export const userControllers = {
    createDoctor
}