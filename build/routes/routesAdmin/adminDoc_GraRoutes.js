"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminDoc_GraController_1 = __importDefault(require("../../controllers/admin/adminDoc_GraController"));
class AdminDocente_GradoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminDoc_GraController_1.default.list);
        this.router.get('/:nif_doc', adminDoc_GraController_1.default.listOneDocenteGrado);
        this.router.post('/add', adminDoc_GraController_1.default.createDocente_Grado);
        this.router.put('/update/:cod_gra/:nif_doc', adminDoc_GraController_1.default.updateDocente_Grado);
        this.router.delete('/delete/:cod_gra/:nif_doc', adminDoc_GraController_1.default.deleteDocente_Grado);
    }
}
const adminDocente_GradoRoutes = new AdminDocente_GradoRoutes();
exports.default = adminDocente_GradoRoutes.router;
