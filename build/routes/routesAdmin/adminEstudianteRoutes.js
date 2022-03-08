"use strict";
//rutas de los servicios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminEstudianteController_1 = __importDefault(require("../../controllers/admin/adminEstudianteController"));
class AdminRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminEstudianteController_1.default.list);
        this.router.get('/:id_alu', adminEstudianteController_1.default.getOne);
        this.router.post('/add', adminEstudianteController_1.default.create);
        this.router.put('/update/:id_alu', adminEstudianteController_1.default.update);
        this.router.delete('/delete/:id_alu', adminEstudianteController_1.default.delete);
    }
}
const adminEstudiantenRoutes = new AdminRoutes();
exports.default = adminEstudiantenRoutes.router;
