import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
    password: z.string("Password is required")
        .min(8, "Password must be at least 6 characters")
        .max(50, "Password must be less than 20 characters"),
    doctor: z.object({
        name: z.string("Name is required")
            .min(5, "Name must be at least 5 characters")
            .max(50, "Name must be less than 50 characters"),

        email: z.email("Invalid email address"),

        contactNumber: z.string("Contact number is required"),

        // contactNumber: z.string("Contact number is required")
        //     .regex(
        //         /^\+8801[3-9]\d{8}$/,
        //         "Must be a valid Bangladeshi number starting with +880 (e.g., +8801712345678)"
        //     ),

        address: z.string()
            .min(5, "Address must be at least 5 characters")
            .max(100, "Address must be less than 100 characters")
            .optional(),

        registrationNumber: z.string("Registration number is required"),

        experience: z.string("Experience is required"),

        gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], "Gender must be either MALE, FEMALE or OTHERS"),

        appointmentFee: z.number("Appointment fee is required and must be a number")
            .nonnegative("Appointment fee must be non-negative"),

        qualification: z.string("Qualification is required")
            .min(5, "Qualification must be at least 2 characters")
            .max(100, "Qualification must be less than 50 characters"),

        currentWorkingPlace: z.string("Current working place is required")
            .min(5, "Current working place must be at least 5 characters")
            .max(100, "Current working place must be less than 100 characters"),

        designation: z.string("Designation is required")
            .min(5, "Designation must be at least 5 characters")
            .max(100, "Designation must be less than 100 characters"),
    }),

    specialities: z.array(z.uuid(), "Speciality must be an array of strings")
        .min(1, "Speciality must be at least 1")
        .max(12, "Speciality must be less than 12")
})