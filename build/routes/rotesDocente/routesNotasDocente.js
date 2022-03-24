"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docenteNotaController_1 = __importDefault(require("../../controllers/docente/docenteNotaController"));
class DocenteNotaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', docenteNotaController_1.default.list);
    }
}
const docenteNotasRoutes = new DocenteNotaRoutes();
exports.default = docenteNotasRoutes.router;
