"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getLogIn = exports.getSignUp = void 0;
const userModel_1 = require("../model/userModel");
const jwt_1 = require("../token/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getSignUp = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        await userModel_1.User.create({ email, username, password });
        res.status(201).json({ message: "Successfully Sign Up" });
    }
    catch (err) {
        res.status(400).json({
            message: err.code === 11000
                ? "Oops! Email address already used"
                : "Oops! Something went wrong while signing up. Please try again later.",
        });
    }
};
exports.getSignUp = getSignUp;
const getLogIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const findUser = await userModel_1.User.findOne({ username });
        const passwordCompare = await bcrypt_1.default.compare(password, findUser?.password);
        if (!findUser || !passwordCompare) {
            throw new Error("Opps! Wrong Credentials");
        }
        const token = (0, jwt_1.createAccessToken)(findUser?._id.toString());
        res
            .status(201)
            .cookie("userToken", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000,
            sameSite: "strict",
            secure: true,
        })
            .json({ message: "Successfully Log In" });
    }
    catch (err) {
        console.log("Invalid");
        res.status(400).json({ message: "Invalid Credentials, Please try again" });
    }
};
exports.getLogIn = getLogIn;
const changePassword = async (req, res) => {
    const { password, newpassword } = req.body;
    try {
        const findUser = await userModel_1.User.findById(req.user._id);
        if (!findUser) {
            res.status(400);
            throw new Error("User not found");
        }
        const passwordCompare = await bcrypt_1.default.compare(password, findUser.password);
        console.log("Waiting");
        if (!passwordCompare) {
            return res
                .status(400)
                .json({ message: "Invalid Current password, please try again" });
        }
        findUser.password = newpassword;
        await findUser.save();
        return res.status(200).json({ message: "Password successfully change" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.changePassword = changePassword;
