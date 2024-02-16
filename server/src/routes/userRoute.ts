import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes";
import {
  addNote,
  editNotes,
  getNotes,
  editNotePin,
  editNoteFavorite,
} from "../controller/noteController";
const router = express.Router();

router
  .route("/notes")
  .get(protectedRoutes, getNotes)
  .post(protectedRoutes, addNote);
router.patch("/notes/:id", protectedRoutes, editNotes);
router.patch("/notes/pin/:id", protectedRoutes, editNotePin);
router.patch("/notes/favorite/:id", protectedRoutes, editNoteFavorite);
export default router;
