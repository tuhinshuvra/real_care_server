import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDoctorZodSchema } from "./user.validation";

const router = Router();

router.post(
    '/create-doctor',
    validateRequest(createDoctorZodSchema),
    userControllers.createDoctor
);
// router.post('/create-admin', userControllers.createDoctor);
// router.post('/create-superadmin', userControllers.createDoctor);

export const userRoutes = router;