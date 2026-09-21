import { prisma } from "../../lib/prisma"
import { Speciality } from "../../../generated/prisma/client"

const createSpeciality = async (payload: Speciality): Promise<Speciality> => {
    const speciality = await prisma.speciality.create({
        data: payload
    })
    return speciality
}

const getAllSpeciality = async (): Promise<Speciality[]> => {
    const specialities = await prisma.speciality.findMany();

    if (!specialities) {
        throw new Error("No Speciality found")
    };

    return specialities
}

const deleteOneSpeciality = async (id: string) => {
    const speciality = await prisma.speciality.delete({
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
    const speciality = await prisma.speciality.findUnique({
        where: {
            id
        }
    });

    if (!speciality) {
        throw new Error("Speciality not found")
    };

    return speciality
}
const updateOneSpeciality = async (id: string, payload: Speciality) => {
    const speciality = await prisma.speciality.update({
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