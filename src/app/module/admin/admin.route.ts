import { Router } from "express";
import { adminControllers } from "./admin.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get('/',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminControllers.getAllAdmins);

router.get('/:id',
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminControllers.getAdminById);

router.patch('/:id',
    checkAuth(Role.SUPER_ADMIN),
    adminControllers.updateAdmin);

router.delete('/:id',
    checkAuth(Role.SUPER_ADMIN),
    adminControllers.deleteAdmin);

router.patch('/change-user-status',
    checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
    adminControllers.changeUserStatus);

router.patch('/change-user-role',
    checkAuth(Role.SUPER_ADMIN),
    adminControllers.changeUserRole);

export const adminRoutes = router;