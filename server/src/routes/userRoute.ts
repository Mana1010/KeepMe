import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes";
import {
  addNote,
  editNotes,
  getNotes,
  editNote,
} from "../controller/noteController";
const router = express.Router();

router
  .route("/notes")
  .get(protectedRoutes, getNotes)
  .post(protectedRoutes, addNote)
  .patch(protectedRoutes, editNotes);

router.put("/notes/:id", protectedRoutes, editNote);
export default router;
