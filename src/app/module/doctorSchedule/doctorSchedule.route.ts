import { Router } from "express";
import { doctorScheduleControllers } from "./doctorSchedule.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post('/create-my-doctor-schedule',
    checkAuth(Role.DOCTOR),
    doctorScheduleControllers.createMyDoctorSchedule);

router.get('/my-doctor-schedules',
    checkAuth(Role.DOCTOR),
    doctorScheduleControllers.getMyDoctorSchedules);

router.get('/',
    checkAuth(Role.DOCTOR, Role.ADMIN, Role.SUPER_ADMIN),
    doctorScheduleControllers.getAllDoctorSchedules);

router.get('/:doctorId/schedule/:scheduleId',
    checkAuth(Role.DOCTOR, Role.ADMIN, Role.SUPER_ADMIN),
    doctorScheduleControllers.getDoctorSheduleById);

router.patch('/update-my-doctor-schedule',
    checkAuth(Role.DOCTOR),
    doctorScheduleControllers.updateMyDoctorScheduleById);

router.patch('/delete-my-doctor-schedule/:id',
    checkAuth(Role.DOCTOR),
    doctorScheduleControllers.deleteMyDoctorSchedule);

export const doctorScheduleRoutes = router;