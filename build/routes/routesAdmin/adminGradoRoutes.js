"use strict";
//rutas de los servicios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminGradoController_1 = __importDefault(require("../../controllers/admin/adminGradoController"));
class AdminGradoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminGradoController_1.default.list);
        this.router.get('/:cod_gra', adminGradoController_1.default.getOneGrado);
        this.router.post('/add', adminGradoController_1.default.createGrado);
        this.router.put('/update/:cod_gra', adminGradoController_1.default.updateGrado);
        this.router.delete('/delete/:cod_gra', adminGradoController_1.default.deleteGrado);
    }
}
const adminGradoRoutes = new AdminGradoRoutes();
exports.default = adminGradoRoutes.router;
