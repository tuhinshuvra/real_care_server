import { Gender } from "../../../generated/prisma/enums";

export interface IUpdateDoctorPayload {
    name?: string;
    profilePhoto?: string;
    contactNumber?: string;
    address?: string;
    registrationNumber?: string;
    experience?: string;
    gender?: Gender;
    appointmentFee?: number;
    qualification?: string;
    currentWorkingPlace?: string;
    designation?: string;
}   