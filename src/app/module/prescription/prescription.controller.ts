import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { prescriptionServices } from './prescription.service';

const givePrescription = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const result = await prescriptionServices.givePrescription(user, payload);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Prescription created successfully',
        data: result,
    });
});

const myPrescriptions = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const result = await prescriptionServices.myPrescriptions(user);
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Prescription fetched successfully',
        data: result
    });
});

const getAllPrescriptions = catchAsync(async (req: Request, res: Response) => {
    const result = await prescriptionServices.getAllPrescriptions();
    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Prescriptions retrieval successfully',
        data: result
    });
});

const updatePrescription = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const prescriptionId = req.params.id;
    const payload = req.body;
    const result = await prescriptionServices.updatePrescription(user, prescriptionId as string, payload);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Prescription updated successfully',
        data: result
    });
});

const deletePrescription = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const prescriptionId = req.params.id;
    await prescriptionServices.deletePrescription(user, prescriptionId as string);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Prescription deleted successfully',
    });
});

export const prescriptionControllers = {
    givePrescription,
    myPrescriptions,
    getAllPrescriptions,
    updatePrescription,
    deletePrescription
};