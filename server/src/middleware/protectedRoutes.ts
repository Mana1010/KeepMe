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
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    req.user = null;
    next();
    return;
  }
  try {
    const accessTokenParsed = accessToken.split(" ")[1];
    const token = jwt.verify(
      accessTokenParsed,
      process.env.ACCESS_TOKEN_KEY!
    ) as JwtPayload;
    req.user = await User.findById(token.id).select("-password");
    next();
  } catch (err) {
    req.user = null;
    res.status(401).json({ message: "Unauthorized" });
    next();
  }
};
