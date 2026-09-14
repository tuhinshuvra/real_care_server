import { User, UserStatus } from '../../../generated/prisma/client'
import { auth } from '../../lib/auth';
import { prisma } from '../../lib/prisma';

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
        throw new Error("Failed to register patient")
    }
    // const patient = await prisma.$transaction(async (tx) => {
    //     await tx.user.create
    // })

    return data
}

interface ILoginUserPayload {
    email: string;
    password: string;
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
        throw new Error("User is blocked. Failed to login user")
    }

    if (data.user.status === UserStatus.INACTIVE) {
        throw new Error("User is inactive . Failed to login user")
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted . Failed to login user")
    }

    return data;
}


export const authService = {
    registerPatient,
    loginUser
}