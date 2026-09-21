/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import status from "http-status";
import { z } from "zod";
import { TErrorResposne, TErrorSources } from "../interfaces/error.interface";
import { handleZodError } from "../errorHelpers/handleZodError";
import AppError from "../errorHelpers/AppError";



export const globalErrorHandlar = ((error: any, req: Request, res: Response, _next: NextFunction) => {

    if (envVars.NODE_ENV === "development") {
        console.log("🚀 Error from Global Error Handlar : ", error);
    }

    let errorSources: TErrorSources[] = []
    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal Server Error';
    let stack: any

    if (error instanceof z.ZodError) {
        const simplifiedError = handleZodError(error);
        statusCode = simplifiedError.statusCode as number;
        message = simplifiedError.message;
        errorSources = [...simplifiedError.errorSources]
        stack = error.stack;
    } else if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
        stack = error.stack;
        errorSources = [{
            path: '',
            message: error.message
        }]
    }

    else if (error instanceof Error) {
        statusCode = status.INTERNAL_SERVER_ERROR;
        message = error.message;
        stack = error.stack;
        errorSources = [
            {
                path: '',
                message: error.message
            }
        ]
    }

    const errorResponse: TErrorResposne = {
        success: false,
        message,
        errorSources,
        errors: envVars.NODE_ENV === "development" ? error : error.message,
    }

    res.status(statusCode).json(errorResponse);
})