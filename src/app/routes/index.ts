import { Router } from "express";
import { authRoutes } from "../module/auth/auth.route";
import { specialityRoutes } from "../module/specialty/speciality.route";
import { userRoutes } from "../module/user/user.route";
import { doctorRoutes } from "../module/doctor/doctor.route";

const router = Router();


router.use('/auth', authRoutes);
router.use('/specialities', specialityRoutes)
router.use('/users', userRoutes)
router.use('/doctors', doctorRoutes)


export const indexRoutes = router;