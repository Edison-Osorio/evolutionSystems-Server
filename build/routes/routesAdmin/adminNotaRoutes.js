"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminNotaContrioller_1 = __importDefault(require("../../controllers/admin/adminNotaContrioller"));
class AdminNotaRoutes {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.routes.get('/', adminNotaContrioller_1.default.list);
        this.routes.post('/add', adminNotaContrioller_1.default.createNota);
        this.routes.put('/update/:id_asi/:id_alu', adminNotaContrioller_1.default.updateNota);
        this.routes.delete('/delete/:id_asi/:id_alu', adminNotaContrioller_1.default.deleteNota);
        this.routes.get('/:alu_id', adminNotaContrioller_1.default.listOne);
    }
}
const adminNotaRoutes = new AdminNotaRoutes();
exports.default = adminNotaRoutes.routes;
