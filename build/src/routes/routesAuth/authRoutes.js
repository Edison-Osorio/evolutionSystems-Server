"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../../controllers/auth/authController");
const express_1 = require("express");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/signup", authController_1.signup);
        this.router.post("/signin", authController_1.signin);
        this.router.put("/updateUser/:id", authController_1.updateUser);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
