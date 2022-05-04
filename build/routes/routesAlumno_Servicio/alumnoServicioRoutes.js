"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Alumno_ServicioController_1 = __importDefault(require("../../controllers/alumno_Servicio/Alumno_ServicioController"));
class AlumnoServicio {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', Alumno_ServicioController_1.default.listarAlumno_Servicio);
        this.router.get('/:id_alumno/:cod_servicio', Alumno_ServicioController_1.default.getOneAlumno_Servicio);
        this.router.post('/add', Alumno_ServicioController_1.default.createAlumno_Servicio);
        this.router.delete('/delete/:id_alumno/:cod_servicio', Alumno_ServicioController_1.default.deleteAlumno_Servicio);
        this.router.put('/update/:id_alu/:cod_ser', Alumno_ServicioController_1.default.updateAlumno_Servicio);
    }
}
const alumnoServicioRoutes = new AlumnoServicio();
exports.default = alumnoServicioRoutes.router;
