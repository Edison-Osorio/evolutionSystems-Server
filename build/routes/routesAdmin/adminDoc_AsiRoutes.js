"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminDoc_AsiController_1 = __importDefault(require("../../controllers/admin/adminDoc_AsiController"));
class AdminDoc_AsiRoutes {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.routes.get('/', adminDoc_AsiController_1.default.list);
        this.routes.post('/add', adminDoc_AsiController_1.default.createDocente_Asignatura);
        this.routes.put('/update/:nif/:id_asi', adminDoc_AsiController_1.default.updateDocente_Asignatura);
        this.routes.delete('/delete/:nif_doc/:id_asi', adminDoc_AsiController_1.default.deleteDocente_Asignatura);
    }
}
const adminDoc_AsiRoutes = new AdminDoc_AsiRoutes();
exports.default = adminDoc_AsiRoutes.routes;
