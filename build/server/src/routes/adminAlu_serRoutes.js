"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAlu_SerController_1 = __importDefault(require("../controllers/adminAlu_SerController"));
class AdminAlu_Ser {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminAlu_SerController_1.default.list);
        this.router.post('/add', adminAlu_SerController_1.default.createAlu_Ser);
        this.router.delete('delete/:id_alu', adminAlu_SerController_1.default.deleteAlu_Ser);
    }
}
const adminAlu_SerRoutes = new AdminAlu_Ser();
exports.default = adminAlu_SerRoutes.router;
