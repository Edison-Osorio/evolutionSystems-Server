"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminHorarioController_1 = __importDefault(require("../controllers/adminHorarioController"));
class AdminHorarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminHorarioController_1.default.list);
        this.router.get('/:cod_hor', adminHorarioController_1.default.getOneHorario);
        this.router.post('/add', adminHorarioController_1.default.createHorario);
        this.router.put('/update/:cod_hor', adminHorarioController_1.default.updateHorario);
        this.router.delete('/delete/:cod_hor', adminHorarioController_1.default.deleteHorario);
    }
}
const adminHorarioRoutes = new AdminHorarioRoutes();
exports.default = adminHorarioRoutes.router;
