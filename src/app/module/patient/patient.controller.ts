import status from "http-status";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";
import { patientService } from "./patient.service";
import { Request, Response } from "express";

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const payload = req.body;
    const result = await patientService.updateMyProfile(user, payload);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: "Patient profile updated successfully",
        data: result
    })
})



export const patientControllers = {
    updateMyProfile,
}

