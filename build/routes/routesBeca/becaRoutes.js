"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const becaController_1 = __importDefault(require("../../controllers/beca/becaController"));
class BecaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', becaController_1.default.listarBecas);
        this.router.get('/becas-disponibles', becaController_1.default.listarBecasDisponibles);
        this.router.get('/:codigo_beca', becaController_1.default.getOnebeca);
        this.router.get('/alumno/alumno_beca', becaController_1.default.listOneBeca);
        this.router.get('/alumno/alumno_beca/:id_alumno', becaController_1.default.getBecaAlumno);
        this.router.post('/add', becaController_1.default.createBeca);
        this.router.post('/beca_alumno/add', becaController_1.default.createBecaAlumno);
        this.router.delete('/delete/:cod_beca', becaController_1.default.deleteBeca);
        this.router.delete('/beca_alumno/delete/:codigo_beca/:id_alumno', becaController_1.default.deleteBecaAlumno);
        this.router.put('/update/:cod_beca', becaController_1.default.updateBeca);
    }
}
const becaRoutes = new BecaRoutes();
exports.default = becaRoutes.router;
