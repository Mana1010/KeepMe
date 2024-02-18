import mongoose, { now } from "mongoose";
import moment from "moment-timezone";

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
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});
noteSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
console.log(new Date(Date.now()).toLocaleString());
export const Notes = mongoose.model("notes", noteSchema);
