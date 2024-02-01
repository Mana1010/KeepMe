import mongoose, { Schema } from "mongoose";
import { User } from "./userModel";
const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    isBold: {
      type: Boolean,
      default: false,
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
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

export const Notes = mongoose.model("users", noteSchema);
