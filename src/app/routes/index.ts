import { Router } from "express";
import { authRoutes } from "../module/auth/auth.route";
import { specialityRoutes } from "../module/specialty/speciality.route";
import { userRoutes } from "../module/user/user.route";
import { doctorRoutes } from "../module/doctor/doctor.route";
import { adminRoutes } from "../module/admin/admin.route";
import { scheduleRoutes } from "../module/schedule/schedule.route";
import { appointmentRoutes } from "../module/appointment/appointment.route";
import { doctorScheduleRoutes } from "../module/doctorSchedule/doctorSchedule.route";
import { patientRoutes } from "../module/patient/patient.route";
import { reviewRoutes } from "../module/review/review.route";
import { prescriptionRoutes } from "../module/prescription/prescription.route";

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes)
router.use('/patients', patientRoutes)
router.use('/doctors', doctorRoutes)
router.use('/admins', adminRoutes)
router.use('/specialities', specialityRoutes)
router.use('/schedules', scheduleRoutes)
router.use('/doctor-schedules', doctorScheduleRoutes)
router.use('/appointments', appointmentRoutes)
router.use("/prescriptions", prescriptionRoutes)
router.use('/reviews', reviewRoutes)

export const indexRoutes = router;