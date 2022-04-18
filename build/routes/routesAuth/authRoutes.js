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
        this.router.get('/list/:id', authController_1.listOnUser);
        this.router.post("/signin", authController_1.signin);
        this.router.post("/getOnUser", authController_1.getOnUser);
        this.router.put("/updateUser", authController_1.updatePassword);
        this.router.put('/update/:id', authController_1.update);
        this.router.delete('/delete/:id', authController_1.deleteUser);
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
