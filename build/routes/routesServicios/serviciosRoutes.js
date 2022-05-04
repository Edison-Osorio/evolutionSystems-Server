"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviciosController_1 = __importDefault(require("../../controllers/servicios/serviciosController"));
class ServiciosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', serviciosController_1.default.listarServicios);
        this.router.get('/:cod_ser', serviciosController_1.default.getOneServicio);
        this.router.post('/add', serviciosController_1.default.createServicio);
        this.router.put('/update/:cod_ser', serviciosController_1.default.updateServicio);
        this.router.delete('/delete/:cod_ser', serviciosController_1.default.deleteServicio);
    }
}
const serviciosRoutes = new ServiciosRoutes();
exports.default = serviciosRoutes.router;
