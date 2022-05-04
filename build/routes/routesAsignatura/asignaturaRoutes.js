"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asignaturaController_1 = __importDefault(require("../../controllers/asignatura/asignaturaController"));
class AsignaturaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Routes of asignatura
        this.router.get('/', asignaturaController_1.default.listAsignatura);
        this.router.get('/asignatura-grado/:id_grado', asignaturaController_1.default.listAsignaturaGrado);
        this.router.get('/asignatura-docente/:id_grado', asignaturaController_1.default.listAsignaturaDocente);
        this.router.post('/add-asignatura', asignaturaController_1.default.createAsignatura);
        this.router.post('/add-asignatura-docente', asignaturaController_1.default.docenteAsignatura);
        this.router.put('/update/:id_asignatura', asignaturaController_1.default.updateAsignatura);
        this.router.delete('/delete/:id_asignatura', asignaturaController_1.default.deleteAsignatura);
        this.router.delete('/delete-asignatura-docente/:id_asignatura/:id_docente', asignaturaController_1.default.deleteAsignaturaDocente);
    }
}
const asignaturaRouter = new AsignaturaRouter();
exports.default = asignaturaRouter.router;
