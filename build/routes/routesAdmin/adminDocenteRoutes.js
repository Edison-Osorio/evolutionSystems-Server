"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminDocenteController_1 = __importDefault(require("../../controllers/admin/adminDocenteController"));
class AdminDocenteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminDocenteController_1.default.list);
        this.router.get('/:nif_doc', adminDocenteController_1.default.getOneDocente);
        this.router.post('/add', adminDocenteController_1.default.createDocente);
        this.router.put('/:nif_doc', adminDocenteController_1.default.updateDocente);
        this.router.delete('/:nif_doc', adminDocenteController_1.default.deleteDocente);
    }
}
const adminDocenteRoutes = new AdminDocenteRoutes();
exports.default = adminDocenteRoutes.router;
