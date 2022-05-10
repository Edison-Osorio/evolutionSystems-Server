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
class MatriculaController {
    // Creamos la matricula de un estudiante
    createMatricula(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO matricula SET ? ", [req.body]);
                res.json({ msg: 'Matricula creada' });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador de la matricula al crear las matriculas --> ", error);
                next();
            }
        });
    }
    // Actualizamos una matricula
    updateMatricula(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_matricula } = req.params;
                const query = yield datadase_1.default.query("UPDATE matricula SET ? WHERE id_matricula = ? ", [req.body, id_matricula]);
                res.json({ msg: 'Matricula Actualizada' });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador de la matricula la actualizar una matricula --> ", error);
                next();
            }
        });
    }
    // Eliminamos la matricula
    deleteMatricula(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM matricula WHERE id_alumno_m = ? ", [id_alumno]);
                res.json({ msg: 'Matricula eliminada' });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Alumno al actualizar un alumno --> ", error);
                next();
            }
        });
    }
}
const matriculaController = new MatriculaController();
exports.default = matriculaController;
