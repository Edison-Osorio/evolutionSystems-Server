"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horarioController_1 = __importDefault(require("../../controllers/horario/horarioController"));
class HorarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', horarioController_1.default.listHorario);
        this.router.get('/on-horario/:id_horario', horarioController_1.default.listOneHorario);
        this.router.get('/horario-grado-grupo/:id_grado/:id_grupo', horarioController_1.default.listHorarioGradoGrupo);
        this.router.get('/horario-docente-grado-grupo/:nif_docente', horarioController_1.default.listHorarioGradoGrupoDocente);
        this.router.get('/horario-alumno/:id_alumno', horarioController_1.default.listHorarioAlumno);
        this.router.post('/add-horario', horarioController_1.default.createHorario);
        this.router.post('/add-horario-asignatura', horarioController_1.default.createAsignaturaHorario);
        this.router.put('/update-horario/:id_horario', horarioController_1.default.updateHorario);
        this.router.delete('/delete-horario/:id_horario', horarioController_1.default.deleteHorario);
        this.router.delete('/delete-horario-asignatura/:id_horario/:id_asignatura', horarioController_1.default.deleteAsignaturaHorario);
    }
}
const horarioRoutes = new HorarioRoutes();
exports.default = horarioRoutes.router;
