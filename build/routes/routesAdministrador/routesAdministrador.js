"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administradorController_1 = __importDefault(require("../../controllers/administrador/administradorController"));
class AdministradorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', administradorController_1.default.listarTodos);
        this.router.get('/:documento', administradorController_1.default.getOneAdministrador);
        this.router.delete('/delete/:documento', administradorController_1.default.deleteAdministrador);
        this.router.put('/update/:documento', administradorController_1.default.updateAdministrador);
    }
}
const administradorRoutes = new AdministradorRoutes();
exports.default = administradorRoutes.router;
