/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { prisma } from "../../lib/prisma";
import { UserStatus } from "../../../generated/prisma/enums";
import { IUpdateDoctorPayload } from "./doctor.interface";
import { QueryBuilder } from "../../utils/QueryBuilders";
import { IQueryParams } from "../../interfaces/query.interface";
import { doctorFilterableFields, doctorIncludeConfig, doctorSearchableFields } from "./doctor.constant";
import { Doctor, Prisma } from "../../../generated/prisma/client";

const getAllDoctors = async (query: IQueryParams) => {
    // const doctors = await prisma.doctor.findMany({
    //     where: {
    //         isDeleted: false,
    //     },
    //     include: {
    //         user: true,
    //         specialities: {
    //             include: {
    //                 speciality: true
    //             }
    //         }
    //     }
    // });

    // return doctors

    const queryBuilder = new QueryBuilder<Doctor, Prisma.DoctorWhereInput, Prisma.DoctorInclude>(
        prisma.doctor,
        query,
        {
            searchableFields: doctorSearchableFields,
            filterableFields: doctorFilterableFields,
        }
    )
    const result = await queryBuilder
        .search()
        .filter()
        .where({ isDeleted: false })
        .include({
            user: true,
            specialties: {
                include: {
                    specialty: true
                }
            }
        })
        .dynamicInclude(doctorIncludeConfig)
        .paginate()
        .sort()
        .fields()
        .execute();

    return result
}
const getDoctorById = async (id: string) => {
    const doctors = await prisma.doctor.findUnique({
        where: {
            id,
            isDeleted: false
        },
        include: {
            user: true,
            specialities: {
                include: {
                    speciality: true
                }
            },
            appointments: {
                include: {
                    patient: true,
                    schedule: true,
                    prescription: true
                }
            },
            doctorSchedules: {
                include: {
                    schedule: true
                }
            },
            reviews: true
        }
    });
    if (!doctors) {
        throw new Error("Doctor not found")
    }

    return doctors
}


const updateDoctorById = async (id: string, payload: IUpdateDoctorPayload) => {
    const isDoctorExists = await prisma.doctor.findUnique({
        where: {
            id
        }
    })

    if (!isDoctorExists) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    const { doctor: doctorData, specialties } = payload;

    await prisma.$transaction(async (tx) => {
        if (doctorData) {
            await tx.doctor.update({
                where: {
                    id,
                },
                data: {
                    ...doctorData
                },
            });
        }
        if (specialties && specialties.length > 0) {
            for (const speciality of specialties) {
                const { specialtyId, shouldDelete } = speciality;
                if (shouldDelete) {
                    await tx.doctorSpecialty.delete({
                        where: {
                            idx_doctor_speciality_unique: {
                                doctorId: id,
                                specialityId: specialtyId,
                            }
                        }
                    })
                } else {
                    await tx.doctorSpecialty.upsert({
                        where: {
                            idx_doctor_speciality_unique: {
                                doctorId: id,
                                specialityId: specialtyId,
                            }
                        },
                        create: {
                            doctorId: id,
                            specialityId: specialtyId,
                        },
                        update: {},
                    })
                }
            }
        }
    })

    const doctor = await getDoctorById(id);
    return doctor;
}

const deleteDoctor = async (id: string) => {
    const isDoctorExists = await prisma.doctor.findUnique({
        where: { id },
        include: { user: true, }
    })

    if (!isDoctorExists) {
        throw new AppError(status.NOT_FOUND, "Doctor not found");
    }

    await prisma.$transaction(async (tx) => {
        await tx.doctor.update({
            where: { id },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            }
        })

        await tx.user.update({
            where: { id: isDoctorExists.userId },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                status: UserStatus.DELETED
            }
        })

        await tx.session.deleteMany({
            where: {
                userId: isDoctorExists.userId
            }
        })

        await tx.doctorSpecialty.deleteMany({
            where: { doctorId: id }
        })
    })

    return { message: "Doctor deleted successfully" }
}

export const doctorServices = {
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
    deleteDoctor
}