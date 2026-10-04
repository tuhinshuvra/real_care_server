/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { specialityController } from "./speciality.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { specialityValidation } from "./speciality.validation";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();
router.post('/',
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),  
    multerUpload.single('file'),
    validateRequest(specialityValidation.createSpecialityZodSchema),
    specialityController.createSpeciality);
router.get('/',
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR, Role.PATIENT),
    specialityController.getAllSpeciality);
router.delete('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    specialityController.deleteOneSpeciality);
router.get('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    specialityController.findOneSpeciality);
router.patch('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
    specialityController.updateOneSpeciality);


export const specialityRoutes = router;