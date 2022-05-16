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
class NotaController {
    // asignatura-alumno
    //listar todos
    listNotas(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_grado, id_grupo } = req.params;
            try {
                const query = yield datadase_1.default.query("SELECT alumno.nombre_alumno,grado.nombre_grado, grupo.nombre_grupo,  nota.* FROM nota INNER JOIN asignatura ON nota.id_asignatura_n = asignatura.id_asignatura INNER JOIN alumno ON nota.id_alumno_n = alumno.id_alumno INNER JOIN matricula ON alumno.id_alumno = matricula.id_alumno_m INNER JOIN grado ON matricula.id_grado_m = grado.id_grado INNER JOIN grupo ON matricula.id_grupo_m = grupo.id_grupo WHERE grado.id_grado= ? AND grupo.id_grupo = ?", [id_grado, id_grupo]);
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un error en el controlador de notas la listar las notas --> ', error);
                next();
            }
        });
    }
    //listar uno
    listOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { alu_id } = req.params;
                const query = yield datadase_1.default.query("CALL getOneAlumno(?)", [alu_id]);
                res.json(query);
            }
            catch (error) {
                console.log("ERROR ----->", error);
                next();
            }
        });
    }
    //listamos todas notas de un alumno
    listNotasAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("SELECT asignatura.nombre_asignatura,grado.nombre_grado, grupo.nombre_grupo, alumno.nombre_alumno, nota.* FROM matricula  INNER JOIN grado ON matricula.id_grado_m = grado.id_grado INNER JOIN asignatura ON asignatura.id_grado_a = grado.id_grado INNER JOIN nota ON nota.id_asignatura_n = asignatura.id_asignatura INNER JOIN grupo ON grupo.id_grupo = matricula.id_grupo_m INNER JOIN alumno ON alumno.id_alumno = matricula.id_alumno_m WHERE matricula.id_alumno_m = ? and nota.id_alumno_n = ? ", [id_alumno, id_alumno]);
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de notas la listar las notas de un alumno ----->", error);
                next();
            }
        });
    }
    listPeriodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM periodo");
                res.json(query);
            }
            catch (error) {
                console.log("ERROR ----->", error);
                next();
            }
        });
    }
    // crear
    createNota(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO nota set ?", [req.body]);
                res.json({
                    text: "Se ha asignado una asignatura al alumno",
                    query: query,
                    msg: "Notas creadas",
                });
            }
            catch (error) {
                console.log("ERROR en el controlador de notas la crear una nota----> ", error);
                next();
            }
        });
    }
    //eliminar
    deleteNota(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM nota WHERE id_alumno_n =?", [id_alumno]);
                res.json({ message: "Se ha eliminado la asignatura al alumno" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //Actualizar
    updateNota(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno, id_asignatura, id_periodo } = req.params;
                const query = yield datadase_1.default.query("UPDATE nota set ? WHERE id_asignatura_n = ? AND id_alumno_n = ? AND id_periodo_n = ?", [req.body, id_asignatura, id_alumno, id_periodo]);
                const procedure = yield datadase_1.default.query("call cali(?,?,?)", [id_alumno, id_asignatura, id_periodo]);
                res.json({ text: "Se ha actualizado la asignatura al alumno al alumno" });
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
}
const notaController = new NotaController();
exports.default = notaController;
