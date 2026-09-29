import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { adminServices } from "./admin.service";
import { Request, Response } from "express"

const getAllAdmins = catchAsync(
    async (req: Request, res: Response) => {
        const result = await adminServices.getAllAdmins();
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Admins retrieved successfully",
            data: result
        })
    }
)

const getAdminById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await adminServices.getAdminById(id as string);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Admin retrieved successfully",
            data: result
        })
    }
)

const updateAdmin = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;
        const result = await adminServices.updateAdmin(id as string, payload);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Admin updated successfully",
            data: result
        })
    }
)

const deleteAdminById = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = req.user;

        const result = await adminServices.deleteAdminById(id as string, user);
        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Admin deleted successfully",
            data: result
        })
    }
)

export const adminControllers = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdminById
}