"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumnoController_1 = __importDefault(require("../../controllers/alumno/alumnoController"));
class AlumnoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/notas/:id_alu', alumnoController_1.default.listNotas);
        this.router.get('/horario/:id_alu', alumnoController_1.default.listHorario);
        this.router.get('/servicios/:id_alu', alumnoController_1.default.listServicios);
    }
}
const alumnoRouter = new AlumnoRouter();
exports.default = alumnoRouter.router;
