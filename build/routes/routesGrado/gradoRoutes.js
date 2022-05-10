"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gradoController_1 = __importDefault(require("../../controllers/grado/gradoController"));
class GradoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/grado', gradoController_1.default.listGrado);
        this.router.get('/grupo', gradoController_1.default.listGrupo);
        this.router.get('/ciclo', gradoController_1.default.listCiclos);
        this.router.get('/grado-grupo', gradoController_1.default.listAllGruposGrados);
        this.router.get('/grado-grupo/:id_grado', gradoController_1.default.listGradoGrupos);
        this.router.get('/grados-docente/:nif_docente', gradoController_1.default.listDocenteGrado);
        this.router.post('/add-grado', gradoController_1.default.createGrado);
        this.router.post('/add-grupo', gradoController_1.default.createGrupo);
        this.router.post('/add-grupo-grado', gradoController_1.default.createGrupoGrado);
        this.router.put('/update-grado/:id_grado', gradoController_1.default.updateGrado);
        this.router.delete('/delete-grado/:id_grado', gradoController_1.default.deleteGrado);
        this.router.delete('/delete-grupo-grado/:id_grado/:id_grupo', gradoController_1.default.deleteGrupoGrado);
    }
}
const gradoRouter = new GradoRouter();
exports.default = gradoRouter.router;
