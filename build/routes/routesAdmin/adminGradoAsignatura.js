"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAsignaturaController_1 = __importDefault(require("../../controllers/admin/adminAsignaturaController"));
class AdminAsignaturaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminAsignaturaController_1.default.list);
        this.router.get('/:id_asi', adminAsignaturaController_1.default.getOneAsignatura);
        this.router.post('/add', adminAsignaturaController_1.default.createAsignatura);
        this.router.put('/update/:id_asi');
        this.router.delete('/delete/:id_asi');
    }
}
const adminAsignaturaRoutes = new AdminAsignaturaRoutes();
exports.default = adminAsignaturaRoutes.router;
