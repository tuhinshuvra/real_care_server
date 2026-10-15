import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { appointmentServices } from "./appointment.service";
import { Request, Response } from "express"

const bookAppointment = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const result = await appointmentServices.bookAppointment(payload, user);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: "Appointment created successfully",
        data: result
    })
})

const getMyAppointments = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await appointmentServices.getMyAppointments(user);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: "My appointments retrieved successfully",
        data: result,
    })
})

const getMySingleAppointments = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;
    const result = await appointmentServices.getMySingleAppointment(appointmentId as string, user);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: "My Appointment retrieved successfully",
        data: result
    })
})

const changeAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const payload = req.body;
    const user = req.user;

    const updateAppointment = await appointmentServices.changeAppointmentStatus(appointmentId as string, payload, user);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: "Appointment status updated successfully",
        data: updateAppointment
    })
})

const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
    const result = await appointmentServices.getAllAppointments();

    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: "All Appointments retrieved successfully",
        data: result
    })
})

const bookAppointmentWithPayLater = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const result = await appointmentServices.bookAppointmentWithPayLater(payload, user);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: "Appointment created successfully with pay later option",
        data: result
    })
})

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;
    const result = await appointmentServices.initiatePayment(appointmentId as string, user);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: "Payment initiated successfully",
        data: result
    })
})

export const appointmentControllers = {
    bookAppointment,
    getMyAppointments,
    getMySingleAppointments,
    changeAppointmentStatus,
    getAllAppointments,
    bookAppointmentWithPayLater,
    initiatePayment,
}