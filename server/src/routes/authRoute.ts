import express from "express";
import { getSignUp, getLogIn } from "../controller/authController";
import { protectedRoutes } from "../middleware/protectedRoutes";
import { RequestExtend } from "../middleware/protectedRoutes";
import { changePassword } from "../controller/authController";
const router = express.Router();
router.post("/signup", getSignUp);
router.post("/login", getLogIn);
router.get("/notes", protectedRoutes as any, (req: RequestExtend, res: any) => {
  console.log(req.user);
});
router.post("/changepassword", protectedRoutes as any, changePassword as any);

export default router;
