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
class AsignaturaController {
    //Listamos todas las asignaturas
    listAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM asignatura");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Aasignatura al listar las asignaturas --> ", error);
                next();
            }
        });
    }
    // Listamos las asignaturas segun el grado
    listAsignaturaGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grado } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM asignatura WHERE id_grado_a = ? ", [id_grado]);
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Asignatura al listar las asignaturas por el identificador del grado --> ", error);
                next();
            }
        });
    }
    // Listamos las asignaturas con su docente segun el grado
    listAsignaturaDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grado } = req.params;
                const query = yield datadase_1.default.query("SELECT docente.nif_docente, docente.nombre_docente,asignatura.id_asignatura, asignatura.nombre_asignatura FROM asignatura INNER JOIN asignatura_docente ON asignatura.id_asignatura = asignatura_docente.id_asignatura_ad INNER JOIN docente ON asignatura_docente.id_docente_ad = docente.nif_docente WHERE asignatura.id_grado_a =  ? ", [id_grado]);
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Asignatura al listar las asignaturas con su docente  // Listamos las asignaturas segun el grado por el identificador del grado --> ", error);
                next();
            }
        });
    }
    // Creamos una asignatura
    createAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO asignatura SET ? ", [
                    req.body,
                ]);
                res.json({ msg: 'Asignatura creada' });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador de la asignatura a crear una asignatura --> ", error);
                next();
            }
        });
    }
    // Asiganamos una asignatura a un docente
    docenteAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO asignatura_docente SET ? ", [req.body]);
                res.json({ msg: 'Asignatura asignada al Docente' });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Alumno al actualizar un alumno --> ", error);
                next();
            }
        });
    }
    //Actualizamos las asignaturas
    updateAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_asignatura } = req.params;
                const query = yield datadase_1.default.query("UPDATE asignatura SET ? WHERE id_asignatura = ? ", [req.body, id_asignatura]);
                res.json({ msg: "Asignatura Actualizada" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Asignatura al actualizar una asignatura  --> ", error);
                next();
            }
        });
    }
    //Eliminamos una asignatura
    deleteAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_asignatura } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM asignatura WHERE id_asignatura = ? ", [id_asignatura]);
                res.json({ msg: "Asignatura eliminada" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Asignatura al eliminar una asignatura --> ", error);
                next();
            }
        });
    }
    // Listamos las asignaturas segun el grado
    deleteAsignaturaDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_asignatura, id_docente } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM asignatura_docente WHERE id_asignatura_ad = ? AND id_docente_ad = ? ", [id_asignatura, id_docente]);
                res.json({ msg: 'Asignatura eliminada del docente' });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Asignatura al eliminar una asignatura asignada a un grado --> ", error);
                next();
            }
        });
    }
}
const asignaturaController = new AsignaturaController();
exports.default = asignaturaController;
