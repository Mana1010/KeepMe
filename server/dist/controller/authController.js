"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAccessToken = exports.verifyAccount = exports.changePassword = exports.getLogIn = exports.getSignUp = void 0;
const userModel_1 = require("../model/userModel");
const token_1 = require("../utils/token");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getSignUp = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const salt = await bcrypt_1.default.genSalt();
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        await userModel_1.User.create({ email, username, password: hashedPassword });
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
        const accessToken = (0, token_1.createAccessToken)(findUser?._id.toString());
        const refreshToken = (0, token_1.createRefreshToken)(findUser?._id.toString());
        res
            .status(200)
            .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000,
            sameSite: "none",
            secure: true,
        })
            .json({ message: "Successfully Log In", token: accessToken });
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
};
exports.getLogIn = getLogIn;
const changePassword = async (req, res) => {
    const { password, newpassword } = req.body;
    try {
        if (!req.user) {
            throw new Error("User not authorized, please log in first");
        }
        const findUser = await userModel_1.User.findById(req.user._id);
        if (!findUser) {
            throw new Error("User not authorized, please log in first");
        }
        const passwordCompare = await bcrypt_1.default.compare(password, findUser.password);
        if (!passwordCompare) {
            throw new Error("Invalid current password, please try again");
        }
        const salt = await bcrypt_1.default.genSalt();
        findUser.password = await bcrypt_1.default.hash(newpassword, salt);
        await findUser.save();
        res.status(200).json({ message: "Password successfully change" });
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
};
exports.changePassword = changePassword;
const verifyAccount = (req, res) => {
    if (req.user) {
        res.status(200).json({ message: req.user });
    }
    else {
        console.log("It is not working");
        res.status(401).json({ message: "Error" });
    }
};
exports.verifyAccount = verifyAccount;
const newAccessToken = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    try {
        if (!refreshToken) {
            res.status(401).json({ message: "Unauthorized" });
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
            if (err) {
                res.status(403).json({ message: "Forbidden" });
            }
            else {
                const accessToken = (0, token_1.createAccessToken)(decoded.id.toString());
            }
        });
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.newAccessToken = newAccessToken;
