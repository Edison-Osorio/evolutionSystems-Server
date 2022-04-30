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
class AlumnoController {
    // Listamos todos los alumnos de la tabla de alumno
    listAlumnos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM alumno");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Alumno en listar --> ", error);
                next();
            }
        });
    }
    //Listamos un alumno según de su identifador
    listOneAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM alumno WHERE id_alumno = ? ", [id_alumno]);
                res.json(query[0]);
            }
            catch (error) {
                console.log(" Ocurrio un error en el contrador del Alumno al listar un solo alumno --> ", error);
            }
        });
    }
    //   Creamos un alumno en la tabla alumno
    createAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO alumno SET ? ", [req.body]);
                res.json({ msg: "Alumno creado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Alumno al crear el alumno --> ", error);
                next();
            }
        });
    }
    // Actualizamos un alumno según su indentificador
    updateAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("UPDATE alumno set ? WHERE id_alu = ?", [
                    req.body,
                    id_alumno,
                ]);
                res.json({ msg: 'Alumno Actualizo' });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Alumno al actualizar un alumno --> ", error);
                next();
            }
        });
    }
    // 
    deleteAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM alumno WHERE id_alumno = ? ", [id_alumno]);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Alumno al eliminar un alumno --> ", error);
                next();
            }
        });
    }
}
const alumnoController = new AlumnoController();
exports.default = alumnoController;
