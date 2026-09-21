import { prisma } from "../../lib/prisma"
import { Role, Speciality } from "../../../generated/prisma/client"
import { ICreateDoctorPayload } from "./user.interface";
import { auth } from "../../lib/auth";
import AppError from "../../errorHelpers/AppError";
import status from "http-status";



const createDoctor = async (payload: ICreateDoctorPayload) => {
    const specialities: Speciality[] = [];

    for (const specialityId of payload.specialities) {
        const speciality = await prisma.speciality.findFirst({
            where: {
                id: specialityId
            }
        })

        if (!speciality) {
            // throw new Error(`Speciality with id ${specialityId} is not found`);
            throw new AppError(status.NOT_FOUND, `Speciality with id ${specialityId} is not found`);
        }
        specialities.push(speciality);
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email: payload.doctor.email
        }
    })

    if (userExists) {
        // throw new Error("User already exists with this email");
        throw new AppError(status.CONFLICT, "User already exists with this email");
    }


    const userData = await auth.api.signUpEmail({
        body: {
            email: payload.doctor.email,
            password: payload.password,
            role: Role.DOCTOR,
            name: payload.doctor.name,
            needPasswordChange: true,
        }
    })

    try {
        const result = await prisma.$transaction(async (tx) => {
            const doctorData = await tx.doctor.create({
                data: {
                    userId: userData.user.id,
                    ...payload.doctor,
                }
            })
            const doctorSpecialityData = specialities.map((speciality) => {
                return {
                    doctorId: doctorData.id,
                    specialityId: speciality.id
                }
            })

            await tx.doctorSpeciality.createMany({
                data: doctorSpecialityData
            })

            const doctor = await tx.doctor.findUnique({
                where: {
                    id: doctorData.id
                },
                select: {
                    id: true,
                    userId: true,
                    email: true,
                    name: true,
                    profilePhoto: true,
                    contactNumber: true,
                    address: true,
                    registrationNumber: true,
                    experience: true,
                    gender: true,
                    appointmentFee: true,
                    qualification: true,
                    currentWorkingPlace: true,
                    designation: true,
                    createdAt: true,
                    updatedAt: true,

                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            role: true,
                            status: true,
                            emailVerified: true,
                            image: true,
                            isDeleted: true,
                            deletedAt: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    },
                    specialities: {
                        select: {
                            speciality: {
                                select: {
                                    id: true,
                                    title: true
                                }
                            }
                        }
                    }
                }
            })
            return doctor
        })
        return result;

    } catch (error) {
        console.log("Transactin Error : ", error);
        await prisma.user.delete({
            where: {
                id: userData.user.id
            }
        })
        throw error;
    }
}


export const userServices = {
    createDoctor,

}