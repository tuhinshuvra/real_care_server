import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { ScheduleValidation } from "./schedule.validation";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.post('/',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(ScheduleValidation.createScheduleZodSchema),
    scheduleControllers.createSchedule);

router.get('/',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    scheduleControllers.getAllSchedules);

router.get('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    scheduleControllers.getSheduleById);

router.patch('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(ScheduleValidation.updateScheduleZodSchema),
    scheduleControllers.updateScheduleById);

router.delete('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    scheduleControllers.deleteSchedule);

export const scheduleRoutes = router;