import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../model/userModel";
export interface RequestExtend extends Request {
  user: any;
}
export const protectedRoutes = async (
  req: RequestExtend,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.cookies["userToken"];
  if (!userToken) {
    req.user = null;
    next();
    return;
  }
  try {
    const token = jwt.verify(
      userToken,
      process.env.ACCESS_TOKEN_KEY!
    ) as JwtPayload;
    req.user = await User.findById(token.id).select("-password");
    next();
  } catch (err) {
    req.user = null;
    res.status(401);
    next();
  }
};
