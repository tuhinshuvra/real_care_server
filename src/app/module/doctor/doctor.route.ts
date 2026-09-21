import { Router } from "express";
import { doctorControllers } from "./doctor.controller";


const router = Router();

router.get('/', doctorControllers.getAllDoctors);
router.get('/:id', doctorControllers.getDoctorById);
router.patch('/:id', doctorControllers.updateDoctorById);
router.delete('/:id', doctorControllers.deleteDoctorById);




export const doctorRoutes = router;
