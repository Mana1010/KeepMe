"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const protectedRoutes_1 = require("../middleware/protectedRoutes");
const authController_2 = require("../controller/authController");
const authController_3 = require("../controller/authController");
const router = express_1.default.Router();
router.post("/signup", authController_1.getSignUp);
router.post("/login", authController_1.getLogIn);
router.post("/changepassword", protectedRoutes_1.protectedRoutes, authController_2.changePassword);
router.get("/verifyAccount", protectedRoutes_1.protectedRoutes, authController_3.verifyAccount);
exports.default = router;
