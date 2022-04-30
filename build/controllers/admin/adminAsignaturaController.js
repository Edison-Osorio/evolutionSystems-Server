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
class AdminAsignaturaController {
    //listar todos
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT * FROM asignatura ');
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un error --> ', error);
                next();
            }
        });
    }
    // Obtenemos la asignaturas segun el grado 
    listAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_curso } = req.params;
                const query = yield datadase_1.default.query("SELECT asignatura.id_asi, asignatura.nom_asi FROM asignatura INNER JOIN asignatura_alumno ON asignatura.id_asi = asignatura_alumno.id_asi INNER JOIN alumno ON asignatura_alumno.id_alu = alumno.id_alu WHERE alumno.id_curso = ?", [id_curso]);
                console.log('Se hizo esta consulta');
                res.json(query);
            }
            catch (error) {
                console.log("ERROR -->", error);
                next();
            }
        });
    }
    // Listamos todas las asignaturas segun un identificador de un curso
    listAsignaturasCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_curso } = req.params;
                const query = yield datadase_1.default.query("SELECT asignatura.id_asi, asignatura.nom_asi FROM curso INNER JOIN curso_asignatura on curso.id_curso = curso_asignatura.id_curso_cs INNER JOIN asignatura ON curso_asignatura.id_asignatura_cs = asignatura.id_asi WHERE curso.id_curso = ? ORDER BY asignatura.id_asi asc", [id_curso]);
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un error -->', error);
                next();
            }
        });
    }
    // crear
    createAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO asignatura set ?", [req.body]);
                res.json({ text: 'Se ha crado una nueva asignatura ' });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    // Insertamos en la tabla curso asignatura para asignarle una asignatura a un curso
    createCursoAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO curso_asignatura SET ?", [req.body]);
                res.json({ msg: 'Se ha asignado correctamente la asignatura' });
            }
            catch (error) {
                console.log('Ocurrio un error --> ', error);
                next();
            }
        });
    }
    // Eliminamos las asignaciones segun el curso y la materia
    deleteAsignacion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_asignatura_cs, id_curso_cs } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM curso_asignatura WHERE id_asignatura_cs = ? AND id_curso_cs = ? ", [id_asignatura_cs, id_curso_cs]);
                res.json({ msg: 'Asignatura eliminada del curso' });
            }
            catch (error) {
                console.log('Ocurrio un error --> ', error);
                next();
            }
        });
    }
    //eliminar
    deleteAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_asi } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM asignatura WHERE id_asi = ?', [id_asi]);
                res.json({ message: 'Se ha eliminado la asignatura' });
            }
            catch (error) {
                console.log('ERROR ----> ', error);
                next();
            }
        });
    }
    //Actualizar
    updateAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_asi } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query('UPDATE asignatura set ? WHERE id_asi = ?', [req.body, id_asi]);
                res.json({ text: 'Se ha actualizado la asignatura' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    getOneAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_asi } = req.params;
                const query = yield datadase_1.default.query('SELECT nom_asi,desc_asi,horario.hora,horario.fec_hor FROM asignatura INNER JOIN horario ON asignatura.cod_hor=horario.cod_hor WHERE asignatura.id_asi= ? ', [id_asi]);
                res.json(query);
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminaAsignaturaController = new AdminAsignaturaController();
exports.default = adminaAsignaturaController;
