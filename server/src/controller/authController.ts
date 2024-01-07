import { Request, Response } from "express";
import { User } from "../model/userModel";
import { createAccessToken } from "../token/jwt";
import bcrypt from "bcrypt";
export const getSignUp = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    await User.create({ email, username, password });
    res.status(201).json({ message: "Successfully Sign Up" });
  } catch (err: any) {
    res.status(400).json({
      message:
        err.code === 11000
          ? "Oops! Email address already used"
          : "Oops! Something went wrong while signing up. Please try again later.",
    });
  }
};
export const getLogIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const findUser = await User.findOne({ username });
    const passwordCompare = await bcrypt.compare(
      password,
      findUser?.password as string
    );
    if (!findUser || !passwordCompare) {
      throw new Error("Opps! Wrong Credentials");
    }
    const token = createAccessToken(findUser?._id.toString() as string);
    res
      .status(201)
      .cookie("userToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
        sameSite: "strict",
        secure: true,
      })
      .json({ message: "Successfully Log In" });
  } catch (err) {
    console.log("Invalid");
    res.status(400).json({ message: "Invalid Credentials, Please try again" });
  }
};
