import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Notes } from "../model/noteModel";

export const addNote = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const {
    title,
    content,
    isBold,
    isItalic,
    isFavorite,
    isListOpen,
    listType,
    isPinned,
    bgColor,
  } = req.body;
  console.log(req.body);
  try {
    await Notes.create({
      title,
      content,
      isBold,
      isItalic,
      isListOpen,
      listType,
      isPinned,
      isFavorite,
      bgColor,
      createdBy: req.user._id,
      owner: req.user.username,
    });
    res.status(201).json({ message: "Successfully add your note" });
  } catch (err) {
    res.status(400);
    throw new Error("Failed to add note, please try again");
  }
});
export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const userNote = await Notes.find({ createdBy: req.user._id });
  if (!userNote) {
    res.status(200).json({ message: [] });
  }
  res.status(200).json({ message: userNote });
});
export const editNotes = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    content,
    isBold,
    isItalic,
    isListOpen,
    listType,
    isPinned,
    isFavorite,
    bgColor,
  } = req.body;
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const editNote = await Notes.findById(id);
  if (!editNote) {
    res.status(404);
    throw new Error("Note not found");
  }
  editNote.title = title;
  editNote.content = content;
  editNote.isBold = isBold;
  editNote.isItalic = isItalic;
  editNote.isFavorite = isFavorite;
  editNote.isListOpen = isListOpen;
  editNote.listType = listType;
  editNote.isPinned = isPinned;
  editNote.bgColor = bgColor;
  await editNote.save();
  res.status(200).json({ message: "Successfully updated your note." });
});
export const editNotePin = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isPinned } = req.body;
  if (!req.user) {
    res.status(401);
    throw new Error("Unauthorized");
  }
  const editNotePin = await Notes.findById(id);
  if (!editNotePin) {
    res.status(404);
    throw new Error("Note is not found");
  }
  editNotePin.isPinned = isPinned;
  await editNotePin.save();
  if (isPinned) {
    res.status(200).json({ message: "Note successfully pinned." });
    return;
  }
  res.status(200).json({ message: "Note successfully unpinned." });
});
export const editNoteFavorite = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isFavorite } = req.body;
    if (!req.user) {
      res.status(401);
      throw new Error("Unauthorized");
    }
    const editNoteFavorite = await Notes.findById(id);
    if (!editNoteFavorite) {
      res.status(404);
      throw new Error("Note is not found");
    }
    editNoteFavorite.isFavorite = isFavorite;
    await editNoteFavorite.save();
    if (isFavorite) {
      res.status(200).json({ message: "Note successfully add to Favorites." });
      return;
    }
    res
      .status(200)
      .json({ message: "Note successfully remove from Favorites." });
  }
);
