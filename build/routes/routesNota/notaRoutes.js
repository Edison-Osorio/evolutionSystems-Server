"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notaController_1 = __importDefault(require("../../controllers/nota/notaController"));
class NotaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/list-notas/:id_grado/:id_grupo', notaController_1.default.listNotas);
        this.router.get('/notas-alumno/:id_alumno', notaController_1.default.listNotasAlumno);
        this.router.get('/periodo', notaController_1.default.listPeriodo);
        this.router.post('/add-nota', notaController_1.default.createNota);
        this.router.put('/update-nota/:id_alumno/:id_asignatura/:id_periodo', notaController_1.default.updateNota);
    }
}
const notaRoutes = new NotaRoutes();
exports.default = notaRoutes.router;
