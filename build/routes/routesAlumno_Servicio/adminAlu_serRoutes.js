"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAlu_SerController_1 = __importDefault(require("../../controllers/alumno_Servicio/adminAlu_SerController"));
class AdminAlu_Ser {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminAlu_SerController_1.default.listarAlumno_Servicio);
        this.router.get('/:id_alumno/:cod_servicio', adminAlu_SerController_1.default.getOneAlumno_Servicio);
        this.router.post('/add', adminAlu_SerController_1.default.createAlumno_Servicio);
        this.router.delete('/delete/:id_alumno/:cod_servicio', adminAlu_SerController_1.default.deleteAlumno_Servicio);
        this.router.put('/update/:id_alu/:cod_ser', adminAlu_SerController_1.default.updateAlumno_Servicio);
    }
}
const adminAlu_SerRoutes = new AdminAlu_Ser();
exports.default = adminAlu_SerRoutes.router;
