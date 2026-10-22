import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { updatePatientMyProfileMiddleware } from "./patient.middlewares";
import { patientValidation } from "./patient.validation";
import { patientControllers } from "./patient.controller";

const router = Router();

router.patch("/update-my-profile",
    checkAuth(Role.PATIENT),
    multerUpload.fields([
        { name: "profilePhoto", maxCount: 1 },
        { name: "medicalReports", maxCount: 5 }
    ]),
    updatePatientMyProfileMiddleware,
    validateRequest(patientValidation.updatePatientProfileZodSchema),
    patientControllers.updateMyProfile
)

export const patientRoutes = router;