import { Types } from "mongoose";
interface User {
  username?: string;
  _id?: Types.ObjectId;
  createdAt?: number;
}

declare global {
  namespace Express {
    interface Request {
      user: User | null;
    }
  }
}

export {};
