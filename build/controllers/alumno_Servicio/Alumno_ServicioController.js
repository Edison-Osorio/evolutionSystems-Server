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
class AlumnoSerController {
    //listar todos los alumnos con servicios
    listarAlumno_Servicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT alumno.id_alumno,alumno.nombre_alumno,servicio.tipo_servicio,servicio.descripcion_servicio,servicio.id_servicio FROM alumno INNER JOIN alumno_servicio on alumno.id_alumno=alumno_servicio.id_alumno_as INNER JOIN servicio ON alumno_servicio.codigo_servicio_as=servicio.id_servicio");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error", error);
                next();
            }
        });
    }
    //obtener un solo alumno con servicio
    getOneAlumno_Servicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno, cod_servicio } = req.params;
                console.log(id_alumno);
                const query = yield datadase_1.default.query("SELECT * FROM alumno_servicio WHERE id_alumno_as = ? AND codigo_servicio_as = ? ", [id_alumno, cod_servicio]);
                res.json(query[0]);
            }
            catch (error) {
                console.log(error);
                next();
            }
        });
    }
    // asignarle un servicio a un alumno
    createAlumno_Servicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO alumno_servicio set ?", [req.body]);
                res.json({ text: "Se ha asignado un servicio al alumno" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminarle el servicio al alumno
    deleteAlumno_Servicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno, cod_servicio } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM alumno_servicio WHERE id_alumno_as = ? AND codigo_servicio_as =?", [id_alumno, cod_servicio]);
                res.json({ message: "Se ha eliminado el servicio del alumno" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminarle el servicio al alumno según el identificador del alumno
    deleteAlumno_ServicioAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM alumno_servicio WHERE id_alumno_as = ? ", [
                    id_alumno,
                ]);
                res.json({ message: "Se ha eliminado el servicio del alumno" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //Actualizarle el servivio a un alumno
    updateAlumno_Servicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu, cod_ser } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query("UPDATE alumno_servicio set ? WHERE id_alumno = ? AND id_servicio = ?", [req.body, id_alu, cod_ser]);
                res.json({ text: "Se ha actualizado el servicio al alumno" });
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
    // alumno y servicios
    alumnoAndService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("SELECT alumno.id_alumno,alumno.nombre_alumno,servicio.id_servicio,servicio.tipo_servicio,servicio.descripcion_servicio,servicio.valor FROM alumno INNER JOIN alumno_servicio ON alumno.id_alumno=alumno_servicio.id_alumno_as INNER JOIN servicio ON alumno_servicio.codigo_servicio_as=servicio.id_servicio WHERE alumno.id_alumno= ?", [id_alumno]);
                res.json(query);
            }
            catch (error) {
                console.log("!ERROR --> ", error);
                next();
            }
        });
    }
    // servicios fuera del alumno
    alumnoOutService(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM servicio WHERE servicio.id_servicio NOT IN (SELECT alumno_servicio.codigo_servicio_as FROM alumno_servicio WHERE alumno_servicio.id_alumno_as=?)", [id_alumno]);
                res.json(query);
            }
            catch (error) {
                console.log("!ERROR --> ", error);
                next();
           