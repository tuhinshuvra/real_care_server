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
    adminControllers.deleteAdminById);

export const adminRoutes = router;