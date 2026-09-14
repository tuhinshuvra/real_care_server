import { Router } from "express";
import { specialityController } from "./speciality.controller";

const router = Router();
router.post('/', specialityController.createSpeciality);
router.get('/', specialityController.getAllSpeciality);
router.delete('/:id', specialityController.deleteOneSpeciality);
router.get('/:id', specialityController.findOneSpeciality);
router.patch('/:id', specialityController.updateOneSpeciality);


export const specialityRoutes = router;