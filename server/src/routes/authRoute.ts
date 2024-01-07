import express from "express";
import { getSignUp, getLogIn } from "../controller/authController";
const router = express.Router();
router.post("/signup", getSignUp);
router.post("/login", getLogIn);
export default router;
