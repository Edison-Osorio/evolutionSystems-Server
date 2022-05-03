"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminBecaController_1 = __importDefault(require("../../controllers/beca/adminBecaController"));
class AdminBecaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminBecaController_1.default.listarBecas);
        this.router.get('/becas-disponibles', adminBecaController_1.default.listarBecasDisponibles);
        this.router.get('/:codigo_beca', adminBecaController_1.default.getOnebeca);
        this.router.get('/alumno/alumno_beca', adminBecaController_1.default.listOneBeca);
        this.router.post('/add', adminBecaController_1.default.createBeca);
        this.router.post('/beca_alumno/add', adminBecaController_1.default.createBecaAlumno);
        this.router.delete('/delete/:cod_beca', adminBecaController_1.default.deleteBeca);
        this.router.delete('/beca_alumno/delete/:codigo_beca/:id_alumno', adminBecaController_1.default.deleteBecaAlumno);
        this.router.put('/update/:cod_beca', adminBecaController_1.default.updateBeca);
    }
}
const adminBecaRoutes = new AdminBecaRoutes();
exports.default = adminBecaRoutes.router;
