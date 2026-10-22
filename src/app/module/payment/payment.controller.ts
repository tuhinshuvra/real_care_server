/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import status from "http-status";
import { envVars } from "../../config/env";
import { stripe } from "../../config/stripe.config";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { appointmentServices } from "../appointment/appointment.service";
import { paymentServices } from "./payment.service";

const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'] as string
    const webhookSecret = envVars.STRIPE.STRIPE_WEB_HOOK_SECRET;

    if (!signature || !webhookSecret) {
        console.error("Missing Stripe signature or webhook secret");
        return res.status(status.BAD_REQUEST).json({ message: "Missing Stripe signature or webhook secret" })
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (error: any) {
        console.error("Error processing Stripe webhook:", error);
        return res.status(status.BAD_REQUEST).json({ message: "Error processing Stripe webhook" })
    }

    try {
        const result = await paymentServices.handlerStripeWebhookEvent(event);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Stripe webhook event processed successfully",
            data: result
        })
    } catch (error) {
        console.error("Error handling Stripe webhook event:", error);
        sendResponse(res, {
            httpStatusCode: status.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Error handling Stripe webhook event"
        })
    }
})

const bookAppointmentWithPayLater = catchAsync(async (req: Request, res: Response) => {
    const appointment = await appointmentServices.bookAppointmentWithPayLater(req.body, req.user);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Appointment bookied successfully with pay later option",
        data: appointment
    })
})

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;
    const result = await appointmentServices.initiatePayment(appointmentId as string, user);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Payment initiated successfully",
        data: result
    })
})

export const paymentControllers = {
    handleStripeWebhookEvent,
    bookAppointmentWithPayLater,
    initiatePayment
}