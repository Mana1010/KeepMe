import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes";
import * as globalTypes from "../types/global";
import { Response, Request } from "express";
const router = express.Router();

router.get(
  "/notes",
  protectedRoutes as any,
  async (req: Request, res: Response, next) => {
    try {
      res.status(400);
      throw new Error("Lols");
    } catch (err) {
      next(err);
    }
  }
);

export default router;
