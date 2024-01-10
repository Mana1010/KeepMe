"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoutes = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../model/userModel");
const protectedRoutes = async (req, res, next) => {
    const userToken = req.cookies["userToken"];
    if (!userToken) {
        req.user = null;
        next();
        return;
    }
    try {
        const token = jsonwebtoken_1.default.verify(userToken, process.env.ACCESS_TOKEN_KEY);
        req.user = await userModel_1.User.findById(token.id).select("-password");
        next();
    }
    catch (err) {
        req.user = null;
        res.status(401);
        next();
    }
};
exports.protectedRoutes = protectedRoutes;
