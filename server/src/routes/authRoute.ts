import express from "express";
import { getSignUp, getLogIn } from "../controller/authController";
import { protectedRoutes } from "../middleware/protectedRoutes";
import { changePassword } from "../controller/authController";
import { verifyAccount } from "../controller/authController";
const router = express.Router();
router.post("/signup", getSignUp);
router.post("/login", getLogIn);

router.post("/changepassword", protectedRoutes, changePassword as any);
router.get("/verifyAccount", protectedRoutes as any, verifyAccount as any);

export default router;
