import express from 'express';
import { Role } from '../../../generated/prisma/enums';
import { checkAuth } from '../../middleware/checkAuth';
import { validateRequest } from '../../middleware/validateRequest';
import { prescriptionControllers } from './prescription.controller';
import { prescriptionValidations } from './prescription.validation';

const router = express.Router();

router.get('/',
    checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
    prescriptionControllers.getAllPrescriptions
);

router.get('/my-prescriptions',
    checkAuth(Role.PATIENT, Role.DOCTOR),
    prescriptionControllers.myPrescriptions
)

router.post('/',
    checkAuth(Role.DOCTOR),
    validateRequest(prescriptionValidations.createPrescriptionZodSchema),
    prescriptionControllers.givePrescription
)

router.patch('/:id',
    checkAuth(Role.DOCTOR),
    validateRequest(prescriptionValidations.updatePrescriptionZodSchema),
    prescriptionControllers.updatePrescription
)

router.delete('/:id',
    checkAuth(Role.DOCTOR),
    prescriptionControllers.deletePrescription
)


export const prescriptionRoutes = router;