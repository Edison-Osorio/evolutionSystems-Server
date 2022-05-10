"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solucitudesController_1 = __importDefault(require("../../controllers/solicitudes/solucitudesController"));
class SolicitudesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', solucitudesController_1.default.listSolicitudes);
        this.router.post('/add', solucitudesController_1.default.guardarSolicitud);
        this.router.delete('/delete/:id_mensaje', solucitudesController_1.default.eliminarSolicitud);
        this.router.delete('/delete-mensaje-alumno/:id_alumno', solucitudesController_1.default.eliminarSolicitudAlumno);
        this.router.get('/total', solucitudesController_1.default.contarSolicitudes);
    }
}
const solicitudesRoutes = new SolicitudesRoutes();
exports.default = solicitudesRoutes.router;
