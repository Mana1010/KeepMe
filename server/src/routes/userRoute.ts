import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes";
import { addNote, editNotes, getNotes } from "../controller/noteController";
const router = express.Router();

router
  .route("/notes")
  .get(protectedRoutes, getNotes)
  .post(protectedRoutes, addNote)
  .patch(protectedRoutes, editNotes);

export default router;
