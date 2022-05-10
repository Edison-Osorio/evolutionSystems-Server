"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import alumnoController from "../../controllers/alumnoControlleralumno/AlumnoController";
const alumnoController_1 = __importDefault(require("../../controllers/alumno/alumnoController"));
const matriculaController_1 = __importDefault(require("../../controllers/matricula/matriculaController"));
class AlumnoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Routes of alumnos
        this.router.get('/', alumnoController_1.default.listAlumnos);
        this.router.get('/onAlumno/:id_alumno', alumnoController_1.default.listOneAlumno);
        this.router.get('/alumnos-grado-grupo/:id_grado/:id_grupo', alumnoController_1.default.listAlumnoGradoGrupo);
        this.router.get('/onAlumno/grado/:id_alumno', alumnoController_1.default.listOneAlumnoWhitGrado);
        this.router.post('/add-alumno', alumnoController_1.default.createAlumno);
        this.router.put('/update-alumno/:id_alumno', alumnoController_1.default.updateAlumno);
        this.router.delete('/delete-alumno/:id_alumno', alumnoController_1.default.deleteAlumno);
        // Routes of Matricula
        this.router.post('/add-matricula', matriculaController_1.default.createMatricula);
        this.router.put('/update-matricula', matriculaController_1.default.updateMatricula);
        this.router.delete('/delete-matricula', matriculaController_1.default.deleteMatricula);
        // this.router.get('/notas/:id_alu', alumnoController.listNotas);
        // this.router.get('/horario/:id_alu', alumnoController.listHorario);
        // this.router.get('/servicios/:id_alu', alumnoController.listServicios);
    }
}
const alumnoRouter = new AlumnoRouter();
exports.default = alumnoRouter.router;
