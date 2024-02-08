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
    });
    res.status(201).json({ message: "Successfully add your note" });
  } catch (err) {
    res.status(400);
    throw new Error("Failed to add note, please try again");
  }
});
