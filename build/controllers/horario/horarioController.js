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
class HorarioController {
    // listamos todas los horarios
    listHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM horario");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al listar los horario");
                next();
            }
        });
    }
    // listamos un horario por su identifiacador
    listOneHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_horario } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM horario WHERE id_horario = ? ", [id_horario]);
                res.json(query[0]);
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al listar un horario --> ", error);
                next();
            }
        });
    }
    // listamos los horarios según el grado y el grupo
    listHorarioGradoGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grado, id_grupo } = req.params;
                const query = yield datadase_1.default.query("SELECT asignatura.id_asignatura, asignatura.nombre_asignatura,horario.id_horario , horario.dia, horario.hora FROM horario INNER JOIN asignatura_horario ON horario.id_horario = asignatura_horario.id_horario_ah INNER JOIN asignatura ON asignatura.id_asignatura = asignatura_horario.id_asignatura_ah WHERE asignatura.id_grado_a = ?  AND asignatura_horario.id_grupo_h = ? ", [id_grado, id_grupo]);
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al listar un horario --> ", error);
                next();
            }
        });
    }
    // Listamos los horarios según el identificador del docente
    listHorarioGradoGrupoDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_docente } = req.params;
                const query = yield datadase_1.default.query("SELECT asignatura.*, asignatura_horario.id_grupo_h,grado.nombre_grado, grupo.nombre_grupo, horario.* FROM horario INNER JOIN asignatura_horario ON horario.id_horario = asignatura_horario.id_horario_ah INNER JOIN asignatura ON asignatura_horario.id_asignatura_ah = asignatura.id_asignatura INNER JOIN asignatura_docente ON asignatura_docente.id_asignatura_ad = asignatura.id_asignatura INNER JOIN docente ON docente.nif_docente = asignatura_docente.id_docente_ad INNER JOIN grupo ON grupo.id_grupo = asignatura_horario.id_grupo_h INNER JOIN grado ON grado.id_grado = asignatura.id_grado_a WHERE nif_docente = ? ORDER BY horario.dia ASC ", [nif_docente]);
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al listar un horario segun el identificador del docente --> ", error);
                next();
            }
        });
    }
    //  Creamos un horario
    createHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO horario SET ? ", [req.body]);
                res.json({ msg: "Horario Creado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al crear un horario");
                next();
            }
        });
    }
    // Asignamos una asignatura a un horario
    createAsignaturaHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO asignatura_horario SET ? ", [req.body]);
                res.json({ msg: "La asignación fue exitosa" });
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al crear asignatura_horario --> ", error);
                next();
            }
        });
    }
    // Actualizamos un horario
    updateHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_horario } = req.params;
                const query = yield datadase_1.default.query("UPDATE horario SET ? WHERE id_horario = ? ", [
                    req.body,
                    id_horario,
                ]);
                res.json({ msg: "Horario Actualizado con satisfacción" });
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al listar los horario");
                next();
            }
        });
    }
    // Eliminamos un horario
    deleteHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_horario } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM horario WHERE id_horario = ? ", [id_horario]);
                res.json({ msg: "Horario eliminado correctamente" });
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al eliminar un horario");
                next();
            }
        });
    }
    // Eliminamos una asignación de un horario a una asignatura
    deleteAsignaturaHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_horario, id_asignatura } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM asignatura_horario WHERE id_horario_ah = ? AND id_asignatura_ah = ? ", [id_horario, id_asignatura]);
                res.json({ msg: "Se elimino el horario de esta asignatura" });
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de horario al eliminar horario de una asignatura");
                next();
            }
        });
    }
}
const horarioController = new HorarioController();
exports.default = horarioController;
