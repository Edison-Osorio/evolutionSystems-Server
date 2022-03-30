"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminFacturaController_1 = __importDefault(require("../../controllers/admin/adminFacturaController"));
class AdminFacturaRoutes {
    constructor() {
        this.route = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.route.get('/', adminFacturaController_1.default.list);
        this.route.get('/:cod_fac', adminFacturaController_1.default.getOneFactura);
        this.route.post('/add', adminFacturaController_1.default.createFactura);
        this.route.put('/update/:cod_fac', adminFacturaController_1.default.updateFactura);
        this.route.delete('/delete/:cod_fac', adminFacturaController_1.default.deleteFactura);
    }
}
const adminFacturaRoutes = new AdminFacturaRoutes();
exports.default = adminFacturaRoutes.route;
