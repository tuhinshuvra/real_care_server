import status from 'http-status';
import { UserStatus } from '../../../generated/prisma/client'
import AppError from '../../errorHelpers/AppError';
import { auth } from '../../lib/auth';
import { prisma } from '../../lib/prisma';
import { tokenUtils } from '../../utils/token';

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}

interface ILoginUserPayload {
    email: string;
    password: string;
}


const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload;

    const data = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
            // needPasswordChange: false,
            // role: "PATIENT"
        }
    })

    if (!data.user) {
        // throw new Error("Failed to register patient")
        throw new AppError(status.BAD_REQUEST, "Failed to register patient");
    }

    try {
        const patient = await prisma.$transaction(async (tx) => {
            const patientTx = await tx.patient.create({
                data: {
                    userId: data.user.id,
                    name: payload.name,
                    email: payload.email,
                }
            })
            return patientTx;
        })

        const accessToken = tokenUtils.getAccessToken({
            userId: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        });

        const refreshToken = tokenUtils.getRefreshToken({
            userId: data.user.id,
            email: data.user.email,
            name: data.user.name,
            role: data.user.role,
            status: data.user.status,
            isDeleted: data.user.isDeleted,
            emailVerified: data.user.emailVerified
        });


        return {
            ...data,
            accessToken,
            refreshToken,
            patient
        }
    } catch (error) {
        console.log("Transaction error : ", error)
        // throw new Error("Failed to register patient", { cause: error })
        await prisma.user.delete({
            where: {
                id: data.user.id
            }
        })
        throw error;
    }

}


const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: {
            email,
            password
        }
    })

    if (data.user.status === UserStatus.BLOCKED) {
        // throw new Error("User is blocked. Failed to login user")
        throw new AppError(status.FORBIDDEN, "User is blocked. Failed to login user");
    }

    if (data.user.status === UserStatus.INACTIVE) {
        // throw new Error("User is inactive . Failed to login user")
        throw new AppError(status.FORBIDDEN, "User is inactive . Failed to login user");
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        // throw new Error("User is deleted . Failed to login user")
        throw new AppError(status.FORBIDDEN, "User is deleted . Failed to login user");
    }

    const accessToken = tokenUtils.getAccessToken({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified
    });

    const refreshToken = tokenUtils.getRefreshToken({
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        status: data.user.status,
        isDeleted: data.user.isDeleted,
        emailVerified: data.user.emailVerified
    })

    return {
        ...data,
        accessToken,
        refreshToken,
    };
}


export const authService = {
    registerPatient,
    loginUser
}