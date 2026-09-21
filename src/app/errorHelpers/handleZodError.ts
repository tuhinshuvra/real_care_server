import status from "http-status";
import z from "zod";
import { TErrorResposne, TErrorSources } from "../interfaces/error.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleZodError = (error: z.ZodError): TErrorResposne => {

    const simplifiedError = handleZodError(error);

    const statusCode = status.BAD_REQUEST;
    const message = "Zod Validaton Error";
    const errorSources: TErrorSources[] = []

    error.issues.forEach(issue => {
        errorSources.push({
            path: issue.path.length > 1 ? issue.path.join('=>') : issue.path[0].toString(),
            message: issue.message
        })
    })

    return {
        success: false,
        message,
        errorSources,
        statusCode
    }
}