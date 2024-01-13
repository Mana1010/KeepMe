import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { Document } from "mongoose";
import { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password: string) {
        return password.length > 8;
      },
      message: "Password must be greater than 8 characters long.",
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const User = mongoose.model("users", userSchema);
