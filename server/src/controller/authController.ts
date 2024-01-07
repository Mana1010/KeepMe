import { Request, Response } from "express";
import { User } from "../model/userModel";
import { createAccessToken } from "../token/jwt";
import bcrypt from "bcrypt";
import { RequestExtend } from "../middleware/protectedRoutes";
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
export const changePassword = async (req: RequestExtend, res: Response) => {
  const { password, newpassword } = req.body;
  try {
    const findUser = await User.findById(req.user._id);
    if (!findUser) {
      res.status(400);
      throw new Error("User not found");
    }
    const passwordCompare = await bcrypt.compare(password, findUser.password);
    console.log("Waiting");
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ message: "Invalid Current password, please try again" });
    }
    findUser.password = newpassword;
    await findUser.save();
    return res.status(200).json({ message: "Password successfully change" });
  } catch (err: any) {
    console.log(err);
  }
};
