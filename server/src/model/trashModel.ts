import mongoose from "mongoose";

const trashSchema = new mongoose.Schema({
  title: String,
  content: String,
  isBold: {
    type: Boolean,
    default: false,
  },
  isItalic: {
    type: Boolean,
    default: false,
  },
  isListOpen: {
    type: Boolean,
    default: false,
  },
  listType: {
    type: String,
    default: "dot",
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  bgColor: {
    type: String,
    default: "white",
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  owner: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },
});

export const Trash = mongoose.model("Trash", trashSchema);
