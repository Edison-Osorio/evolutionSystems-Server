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
class AdminAlu_SerController {
    //listar todos los alumnos con servicio
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT alumno.id_alu,alumno.nom_alu,servicio.tipo_ser,servicio.desc_ser,servicio.cod_ser FROM alumno INNER JOIN alumno_servicio on alumno.id_alu=alumno_servicio.id_alumno INNER JOIN servicio ON alumno_servicio.cod_servicio=servicio.cod_ser");
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un error', error);
                next();
            }
        });
    }
    //obtener un solo alumno con servicio
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno, cod_servicio } = req.params;
                const query = yield datadase_1.default.query('SELECT * FROM alumno_servicio WHERE id_alumno = ? AND cod_servicio = ? ', [id_alumno, cod_servicio]);
                res.json(query[0]);
            }
            catch (error) {
                console.log(error);
                next();
            }
        });
    }
    // asignarle un servicio a un alumno
    createAlu_Ser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO alumno_servicio set ?", [
                    req.body,
                ]);
                res.json({ text: "Se ha asignado un servicio al alumno" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminarle el servicio al alumno
    deleteAlu_Ser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno, cod_servicio } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM alumno_servicio WHERE id_alumno = ? AND cod_servicio =?", [id_alumno, cod_servicio]);
                res.json({ message: "Se ha eliminado el servicio del alumno" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //Actualizarle el servivio a un alumno
    updateAlu_Ser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu, cod_ser } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query("UPDATE alumno_servicio set ? WHERE id_alumno = ? AND cod_servicio = ?", [req.body, id_alu, cod_ser]);
                res.json({ text: "Se ha actualizado el servicio al alumno" });
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
}
const adminAlu_SerController = new AdminAlu_SerController();
exports.default = adminAlu_SerController;
