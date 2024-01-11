import { Request, Response } from "express";
import { User } from "../model/userModel";
import { createAccessToken, createRefreshToken } from "../utils/jwtToken";
import bcrypt from "bcrypt";
import { RequestExtend } from "../middleware/protectedRoutes";
import jwt, { decode } from "jsonwebtoken";
export const getSignUp = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({ email, username, password: hashedPassword });
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
    const accessToken = createAccessToken(findUser?._id.toString() as string);
    const refreshToken = createRefreshToken(findUser?._id.toString() as string);
    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
        sameSite: "none",
        secure: true,
      })
      .json({ message: "Successfully Log In", token: accessToken });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
export const changePassword = async (req: RequestExtend, res: Response) => {
  const { password, newpassword } = req.body;
  try {
    if (!req.user) {
      throw new Error("User not authorized, please log in first");
    }
    const findUser = await User.findById(req.user._id);
    if (!findUser) {
      throw new Error("User not authorized, please log in first");
    }
    const passwordCompare = await bcrypt.compare(password, findUser.password);
    if (!passwordCompare) {
      throw new Error("Invalid current password, please try again");
    }
    const salt = await bcrypt.genSalt();
    findUser.password = await bcrypt.hash(newpassword, salt);
    await findUser.save();
    res.status(200).json({ message: "Password successfully change" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
export const verifyAccount = (req: RequestExtend, res: Response) => {
  if (req.user) {
    res.status(200).json({ message: req.user });
  } else {
    console.log("It is not working");
    res.status(401).json({ message: "Error" });
  }
};
export const newAccessToken = async (req: RequestExtend, res: Response) => {
  const refreshToken = req.cookies.jwt;
  try {
    if (!refreshToken) {
      res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY!,
      (err: Error | null, decoded: any) => {
        if (err) {
          res.status(403).json({ message: "Forbidden" });
        } else {
          const accessToken = createAccessToken(decoded.id.toString());
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
