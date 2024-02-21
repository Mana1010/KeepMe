import express from "express";
import { protectedRoutes } from "../middleware/protectedRoutes";
import {
  addNote,
  editNotes,
  getNotes,
  editNotePin,
  editNoteFavorite,
  getEditNote,
  deleteNote,
} from "../controller/noteController";
const router = express.Router();

router
  .route("/notes")
  .get(protectedRoutes, getNotes)
  .post(protectedRoutes, addNote);
router
  .route("/notes/:id")
  .get(protectedRoutes, getEditNote)
  .patch(protectedRoutes, editNotes)
  .delete(protectedRoutes, deleteNote);
router.patch("/notes/pin/:id", protectedRoutes, editNotePin);
router.patch("/notes/favorite/:id", protectedRoutes, editNoteFavorite);
export default router;
