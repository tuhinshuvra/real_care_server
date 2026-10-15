import { Router } from "express";
import { appointmentControllers } from "./appointment.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/book-appointment',
    checkAuth(Role.PATIENT),
    appointmentControllers.bookAppointment);

router.get('/my-appointments',
    checkAuth(Role.PATIENT, Role.DOCTOR),
    appointmentControllers.getMyAppointments);

router.patch('/change-appointment-status/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR, Role.PATIENT),
    appointmentControllers.changeAppointmentStatus);

router.get('/my-single-appointment/:id',
    checkAuth(Role.PATIENT, Role.DOCTOR, Role.ADMIN, Role.SUPER_ADMIN),
    appointmentControllers.getMySingleAppointments);

router.get('/all-appointments',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    appointmentControllers.getAllAppointments);

router.post('/book-appointment-with-pay-later',
    checkAuth(Role.PATIENT),
    appointmentControllers.bookAppointmentWithPayLater);

router.post('/initiate-payment/:id',
    checkAuth(Role.PATIENT),
    appointmentControllers.initiatePayment);

export const appointmentRoutes = router;