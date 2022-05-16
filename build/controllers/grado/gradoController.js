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
class GradoController {
    //Listamos todos los grados
    listGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT grado.*, ciclo.* FROM grado INNER JOIN ciclo ON grado.id_ciclo_g = ciclo.id_ciclo");
                const query2 = yield datadase_1.default.query("SELECT grado.*, ciclo.* , COUNT(matricula.id_grado_m) as alumnos FROM grado INNER JOIN ciclo ON grado.id_ciclo_g = ciclo.id_ciclo INNER JOIN matricula ON matricula.id_grado_m = grado.id_grado INNER JOIN alumno ON matricula.id_alumno_m = alumno.id_alumno GROUP BY grado.id_grado");
                res.json({ query, query2 });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al listar los grados --> ", error);
                next();
            }
        });
    }
    // listamos todos los grupos
    listGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM grupo");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al listar los grupo --> ", error);
                next();
            }
        });
    }
    //Lista todos los grupos de todos los grados 
    listAllGruposGrados(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT grado.*, grupo.* FROM grado INNER JOIN grado_grupo ON grado.id_grado = grado_grupo.id_grado_grg INNER JOIN grupo ON grado_grupo.id_grupo_grg = grupo.id_grupo");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Grado al listar los grados con los grupos --> ", error);
                next();
            }
        });
    }
    // Obtenemos todos los grados con sus grupos
    listGradoGrupos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grado } = req.params;
                const query = yield datadase_1.default.query("SELECT grado.*, grupo.* FROM grado INNER JOIN grado_grupo ON grado.id_grado = grado_grupo.id_grado_grg INNER JOIN grupo ON grado_grupo.id_grupo_grg = grupo.id_grupo WHERE grado.id_grado = ? ", [id_grado]);
                const query2 = yield datadase_1.default.query("SELECT grado.*, grupo.*, COUNT(matricula.id_grupo_m) as alumnos FROM grado INNER JOIN ciclo ON grado.id_ciclo_g = ciclo.id_ciclo INNER JOIN matricula ON matricula.id_grado_m = grado.id_grado INNER JOIN alumno ON matricula.id_alumno_m = alumno.id_alumno INNER JOIN grupo ON matricula.id_grupo_m = grupo.id_grupo WHERE grado.id_grado = ? GROUP BY matricula.id_grupo_m", [id_grado]);
                res.json({ query, query2 });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al listar los grupos con sus grados --> ", error);
                next();
            }
        });
    }
    //Listamos todos los ciclos 
    listCiclos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM ciclo");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al listar los ciclos --> ", error);
                next();
            }
        });
    }
    //Listamos todos los grados segun el docente 
    listDocenteGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_docente } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM docente INNER JOIN asignatura_docente ON docente.nif_docente = asignatura_docente.id_docente_ad INNER JOIN asignatura ON asignatura_docente.id_asignatura_ad = asignatura.id_asignatura INNER JOIN grado ON asignatura.id_grado_a = grado.id_grado INNER JOIN ciclo ON grado.id_ciclo_g = ciclo.id_ciclo WHERE nif_docente = ? GROUP BY id_grado_a", [nif_docente]);
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al listar los ciclos --> ", error);
                next();
            }
        });
    }
    // Creamos un grado
    createGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO grado SET ? ", [req.body]);
                res.json({ msg: "Grado creado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al crear un grado --> ", error);
                next();
            }
        });
    }
    //Creamos grupos
    createGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO grupo SET ? ", [req.body]);
                res.json({ msg: "Grupo Creado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al crear un Grupo --> ", error);
                next();
            }
        });
    }
    //Le asignamos un grupo a un grupo
    createGrupoGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO grado_grupo SET ? ", [
                    req.body,
                ]);
                res.json({ msg: "Grupo asignado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grupo la asignar un grupo a un grado --> ", error);
                next();
            }
        });
    }
    // Actualizamos el grado
    updateGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grado } = req.params;
                const query = yield datadase_1.default.query("UPDATE grado SET ?  WHERE id_grado = ?", [
                    req.body,
                    id_grado,
                ]);
                res.json({ msg: "Grado actializado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al actualizar un grado --> ", error);
                next();
            }
        });
    }
    // Eliminamos el grado
    deleteGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grado } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM  grado WHERE id_grado = ? ", [
                    id_grado,
                ]);
                res.json({ msg: "Grado eliminado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al eliminar un grado --> ", error);
                next();
            }
        });
    }
    // Eliminamos un grupo de un grado
    deleteGrupoGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grado, id_grupo } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM grado_grupo WHERE id_grado_grg = ? AND id_grupo_grg = ? ", [id_grado, id_grupo]);
                res.json({ msg: "Grupo eliminada del grado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del grado al actualizar un grupo de un grado --> ", error);
                next();
            }
        });
    }
}
const gradoController = new GradoController();
exports.default = gradoController;
