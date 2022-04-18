"use strict";
//rutas de los servicios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminCursoController_1 = __importDefault(require("../../controllers/admin/adminCursoController"));
class AdminGradoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminCursoController_1.default.list);
        this.router.get('/ciclo', adminCursoController_1.default.listCiclo);
        this.router.get('/grupo', adminCursoController_1.default.listGrupo);
        this.router.get('/:cod_gra', adminCursoController_1.default.getOneCurso);
        this.router.post('/add', adminCursoController_1.default.createCurso);
        this.router.put('/update/:cod_gra', adminCursoController_1.default.updateCurso);
        this.router.delete('/delete/:cod_gra', adminCursoController_1.default.deleteCurso);
    }
}
const adminGradoRoutes = new AdminGradoRoutes();
exports.default = adminGradoRoutes.router;
