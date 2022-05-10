"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datadase_1 = __importDefault(require("../../datadase"));
class SolicitudesController {
    // listar solicitudes 
    listSolicitudes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT alumno.nombre_alumno,alumno.id_alumno,servicio.tipo_servicio,servicio.id_servicio,mensaje.mensaje,mensaje.id_mensaje FROM alumno INNER JOIN mensaje ON alumno.id_alumno=mensaje.id_alumno_m INNER JOIN servicio ON mensaje.id_servicio_m=servicio.id_servicio");
                res.json(query);
            }
            catch (error) {
                console.log("!ERROR -->", error);
                next();
            }
        });
    }
    // guardar solicitudes 
    guardarSolicitud(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('INSERT INTO mensaje SET ?', [req.body]);
                res.json({ text: 'Se guardo con exito' });
            }
            catch (error) {
                console.log('!ERROR --> ', error);
                next();
            }
        });
    }
    // eliminar solicitud 
    eliminarSolicitud(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_mensaje } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM mensaje WHERE id_mensaje= ?', [id_mensaje]);
                res.json({ text: 'Se elimino con exito' });
            }
            catch (error) {
                console.log('!ERROR --> ', error);
                next();
            }
        });
    }
    // Elimina la solicitud por medio del identificador del alumno 
    eliminarSolicitudAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM mensaje WHERE id_alumno_m = ?', [id_alumno]);
                res.json({ text: 'Se elimino con exito' });
            }
            catch (error) {
                console.log('!ERROR --> ', error);
                next();
            }
        });
    }
    // contar solicitudes 
    contarSolicitudes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT COUNT(mensaje) AS total FROM mensaje');
                res.json(query);
            }
            catch (error) {
                console.log('!ERROR --> ', error);
                next();
            }
        });
    }
}
const solicitudesController = new SolicitudesController();
exports.default = solicitudesController;
