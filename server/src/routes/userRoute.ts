import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes";
import * as globalTypes from "../types/global";
import { Response, Request } from "express";
const router = express.Router();

router.get(
  "/notes",
  protectedRoutes,
  async (req: Request, res: Response, next) => {
    res.send("Welcome to Notes");
  }
);

export default router;
