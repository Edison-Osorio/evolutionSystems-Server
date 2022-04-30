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
class AdminGradoController {
    //listar todos
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM curso ORDER BY nombre_curso ASC");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error -->", error);
                next();
            }
        });
    }
    listCiclo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT * FROM ciclo');
                res.json(query);
            }
            catch (error) {
                console.log('Ocuriro un erro listando los ciclos', error);
                next();
            }
        });
    }
    listGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT * FROM grupo');
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un error listando los grupos', error);
                next();
            }
        });
    }
    // Listamos lo grupos uniendo la tabla intermedia entre grupos y cursos
    listCursoGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT curso.*, grupo.* FROM grupo INNER JOIN curso_grupo ON grupo.id_grupo = curso_grupo.id_grupo_cg INNER JOIN  curso ON curso_grupo.id_curso_cg = curso.id_curso");
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un erro en el controlador de curso -->', error);
                next();
            }
        });
    }
    // LISTAMOS LOS GRUPOS SEGUN EL CODIGO DEL CURSO
    listOnCursoGrupos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_curso } = req.params;
                const query = yield datadase_1.default.query("SELECT curso.*, grupo.* FROM grupo INNER JOIN curso_grupo ON grupo.id_grupo = curso_grupo.id_grupo_cg INNER JOIN  curso ON curso_grupo.id_curso_cg = curso.id_curso WHERE curso.id_curso = ? ", [id_curso]);
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un error en el contrador de curso al buscar grupos por un curso -->', error);
                next();
            }
        });
    }
    // crear
    createCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO curso set ?", [req.body]);
                res.json({ text: "Se ha crado un nuevo curso" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    // ASIGNAMOS UN GRUPO A LOS CURSOS
    createGrupoCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Esta es la isecion de grupos', req.body);
                const query = yield datadase_1.default.query("INSERT INTO curso_grupo SET ? ", [req.body]);
                res.json({ msg: 'Grupo creado' });
            }
            catch (error) {
                console.log('Ocurrio un error en el controlador de curso al insertar un grupoCruso --> ', error);
                next();
            }
        });
    }
    //eliminar
    deleteCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_gra } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM curso WHERE id_curso = ?", [
                    cod_gra,
                ]);
                res.json({ message: "Se ha eliminado el grado" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //Actualizar
    updateCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_gra } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query("UPDATE grado set ? WHERE cod_gra = ?", [
                    req.body,
                    cod_gra,
                ]);
                res.json({ text: "Se ha actualizado el servicio al alumno" });
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
    getOneCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_gra } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM grado WHERE cod_gra = ? ", [
                    cod_gra,
                ]);
                res.json(query[0]);
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
}
const adminGradoController = new AdminGradoController();
exports.default = adminGradoController;
