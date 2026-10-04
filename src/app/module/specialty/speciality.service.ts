import { prisma } from "../../lib/prisma"
import { Specialty } from "../../../generated/prisma/client"

const createSpeciality = async (payload: Specialty): Promise<Specialty> => {
    const speciality = await prisma.specialty.create({
        data: payload
    })
    return speciality
}

const getAllSpeciality = async (): Promise<Specialty[]> => {
    const specialities = await prisma.specialty.findMany();

    if (!specialities) {
        throw new Error("No Speciality found")
    };

    return specialities
}

const deleteOneSpeciality = async (id: string) => {
    const speciality = await prisma.specialty.delete({
        where: {
            id
        }
    });

    if (!speciality) {
        throw new Error("Speciality not found, cannot delete")
    };

    return speciality
}

const findOneSpeciality = async (id: string) => {
    const speciality = await prisma.specialty.findUnique({
        where: {
            id
        }
    });

    if (!speciality) {
        throw new Error("Speciality not found")
    };

    return speciality
}
const updateOneSpeciality = async (id: string, payload: Specialty) => {
    const speciality = await prisma.specialty.update({
        where: {
            id,
        },
        data: {
            ...payload
        }
    });

    if (!speciality) {
        throw new Error("Speciality not found")
    };

    return speciality
}

export const specialityService = {
    createSpeciality,
    getAllSpeciality,
    findOneSpeciality,
    updateOneSpeciality,
    deleteOneSpeciality
}