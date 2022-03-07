"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminServiciosController_1 = __importDefault(require("../../controllers/admin/adminServiciosController"));
class AdminServiciosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminServiciosController_1.default.list);
        this.router.get('/:cod_ser', adminServiciosController_1.default.getOneServicio);
        this.router.post('/add', adminServiciosController_1.default.createServicio);
        this.router.put('/:cod_ser', adminServiciosController_1.default.updateServicio);
        this.router.delete('/:cod_ser', adminServiciosController_1.default.deleteServicio);
    }
}
const adminServiciosRoutes = new AdminServiciosRoutes();
exports.default = adminServiciosRoutes.router;
