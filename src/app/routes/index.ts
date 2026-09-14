import { Router } from "express";
import { authRoutes } from "../module/auth/auth.route";
import { specialityRoutes } from "../module/specialty/speciality.route";

const router = Router();


router.use('/auth', authRoutes);
router.use('/specialities', specialityRoutes)


export const indexRoutes = router;
