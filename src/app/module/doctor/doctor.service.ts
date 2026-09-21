/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../lib/prisma";

const getAllDoctors = async () => {
    const doctors = await prisma.doctor.findMany({
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true
                }
            }
        }
    });

    return doctors
}
const getDoctorById = async (id: string) => {
    const doctors = await prisma.doctor.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true
                }
            }
        }
    });
    if (!doctors) {
        throw new Error("Doctor not found")
    }

    return doctors
}
const deleteDoctorById = async (id: string) => {
    const doctors = await prisma.doctor.delete({
        where: {
            id
        },
    });
    if (!doctors) {
        throw new Error("Doctor not found")
    }
    return doctors
}

const updateDoctorById = async (id: string, payload: any) => {
    const { specialities, doctor, ...restData } = payload;

    const updateData = doctor ? doctor : restData;
    delete updateData.email;
    delete updateData.registrationNumber; // Often unique too!

    const updateDoctor = await prisma.doctor.update({
        where: {
            id,
        },
        data: {
            ...updateData
        },
    });
    if (!updateDoctor) {
        throw new Error("Doctor not found")
    }
    return updateDoctor
}

export const doctorServices = {
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
    deleteDoctorById
}