import mongoose from "mongoose";
const noteSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);
noteSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isModified("content")) {
    console.log("Updated", this);
    next();
  }
  console.log("Not updated");
  next();
});

export const Notes = mongoose.model("notes", noteSchema);
