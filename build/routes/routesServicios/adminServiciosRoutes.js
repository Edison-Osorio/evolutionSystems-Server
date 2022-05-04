"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminServiciosController_1 = __importDefault(require("../../controllers/servicios/adminServiciosController"));
class AdminServiciosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminServiciosController_1.default.listarServicios);
        this.router.get('/:cod_ser', adminServiciosController_1.default.getOneServicio);
        this.router.post('/add', adminServiciosController_1.default.createServicio);
        this.router.put('/update/:cod_ser', adminServiciosController_1.default.updateServicio);
        this.router.delete('/delete/:cod_ser', adminServiciosController_1.default.deleteServicio);
    }
}
const adminServiciosRoutes = new AdminServiciosRoutes();
exports.default = adminServiciosRoutes.router;
