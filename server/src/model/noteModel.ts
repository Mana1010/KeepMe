import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
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
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
noteSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isModified("content")) {
    this.updatedAt = new Date();
    next();
    return;
  }
  next();
});

export const Notes = mongoose.model("notes", noteSchema);
