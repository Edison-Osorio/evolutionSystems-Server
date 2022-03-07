"use strict";
//rutas de los servicios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminEstudianteController_1 = __importDefault(require("../controllers/adminEstudianteController"));
const adminDocenteController_1 = __importDefault(require("../controllers/adminDocenteController"));
const adminServiciosController_1 = __importDefault(require("../controllers/adminServiciosController"));
class AdminRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminEstudianteController_1.default.list);
        this.router.get('/docente', adminDocenteController_1.default.list);
        this.router.get('/servicios', adminServiciosController_1.default.list);
        this.router.get('/:id_alu', adminEstudianteController_1.default.getOne);
        this.router.get('/docente/:nif_doc', adminDocenteController_1.default.getOneDocente);
        this.router.get('/servicios/:cod_ser', adminServiciosController_1.default.getOneServicio);
        this.router.post('/add', adminEstudianteController_1.default.create);
        this.router.post('/docente/add', adminDocenteController_1.default.createDocente);
        this.router.post('/servicios/add', adminServiciosController_1.default.createServicio);
        this.router.put('/:id_alu', adminEstudianteController_1.default.update);
        this.router.put('/docente/:nif_doc', adminDocenteController_1.default.updateDocente);
        this.router.put('/servicios/:cod_ser', adminServiciosController_1.default.updateServicio);
        this.router.delete('/:id_alu', adminEstudianteController_1.default.delete);
        this.router.delete('/docente/:nif_doc', adminDocenteController_1.default.deleteDocente);
        this.router.delete('/servicio/:cod_ser', adminServiciosController_1.default.deleteServicio);
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
