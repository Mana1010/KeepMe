import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes";
import { addNote } from "../controller/noteController";
const router = express.Router();

router.post("/notes", protectedRoutes, addNote);

export default router;
