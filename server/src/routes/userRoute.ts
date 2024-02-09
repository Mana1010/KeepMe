import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes";
import { addNote, getNotes } from "../controller/noteController";
const router = express.Router();

router
  .route("/notes")
  .get(protectedRoutes, getNotes)
  .post(protectedRoutes, addNote);

export default router;
