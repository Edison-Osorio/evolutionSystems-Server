"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAsi_AluController_1 = __importDefault(require("../../controllers/admin/adminAsi_AluController"));
class AdminAsi_AluRoutes {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.routes.get('/', adminAsi_AluController_1.default.list);
        this.routes.post('/add', adminAsi_AluController_1.default.createAsi_Alu);
        this.routes.put('/update/:id_alu/:id_asi', adminAsi_AluController_1.default.updateAsi_Alu);
        this.routes.delete('/delete/:id_alu/:id_asi', adminAsi_AluController_1.default.deleteAsi_Alu);
    }
}
const adminAsi_AluRoutes = new AdminAsi_AluRoutes();
exports.default = adminAsi_AluRoutes.routes;
