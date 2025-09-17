import { Router } from "express";

import {
  getPublicProfile,
  getPrivateProfile,
  patchUser,
  deleteUser,
} from "../controllers/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();



router.get("/public", getPublicProfile);

router.get("/private", authMiddleware, getPrivateProfile);
router.patch("/private", authMiddleware, patchUser);
router.delete("/private", authMiddleware, deleteUser);

export default router;


