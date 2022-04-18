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
class DocenteAsignaturaController {
    //listar todas las asignatura
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc } = req.params;
                const query = yield datadase_1.default.query("SELECT docente.nom_doc,nom_asi,desc_asi FROM asignatura INNER JOIN nota ON asignatura.id_asi=nota.id_asi INNER JOIN docente_asignatura ON asignatura.id_asi=docente_asignatura.id_asi INNER JOIN docente ON docente_asignatura.nif_doc=docente.nif_doc  WHERE docente_asignatura.nif_doc= ?", [nif_doc]);
                res.json(query);
            }
            catch (error) {
                console.log("ERROR -->", error);
                next();
            }
        });
    }
    listProgramador(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc } = req.params;
                const query = yield datadase_1.default.query("SELECT horario.fec_hor, horario.hora, asignatura.nom_asi, grado.nom_grad, grado.desc_grad FROM horario INNER JOIN asignatura ON horario.cod_hor = asignatura.cod_hor INNER JOIN docente_asignatura ON asignatura.id_asi = docente_asignatura.id_asi INNER JOIN docente ON docente_asignatura.nif_doc = docente.nif_doc INNER JOIN docente_grado ON docente.nif_doc = docente_grado.nif_doc INNER JOIN grado ON docente_grado.cod_gra = grado.cod_gra WHERE docente.nif_doc = ?", [nif_doc]);
                res.json(query);
            }
            catch (error) {
                console.log("ERROR -->", error);
                next();
            }
        });
    }
    listAsignaturaDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc } = req.params;
                const query = yield datadase_1.default.query("SELECT asignatura.id_asi, asignatura.nom_asi FROM asignatura INNER JOIN docente_asignatura ON asignatura.id_asi = docente_asignatura.id_asi INNER JOIN docente ON docente_asignatura.nif_doc = docente.nif_doc WHERE docente.nif_doc = ?", [nif_doc]);
                res.json(query);
            }
            catch (error) {
                console.log("ERROR -->", error);
                next();
            }
        });
    }
    //listar los grupos
    listGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc, cod_gra } = req.params;
                const query = yield datadase_1.default.query("SELECT grado.cod_gra,grado.nom_grad,grado.carac_grad FROM grado INNER JOIN docente_grado ON grado.cod_gra=docente_grado.cod_gra WHERE docente_grado.nif_doc= ? AND docente_grado.cod_gra= ?", [nif_doc, cod_gra]);
                res.json({ text: query });
                console.log(query);
                console.log(req.params);
            }
            catch (error) {
                console.log("error", error);
                next();
            }
        });
    }
    //Actualizar
    updateNota(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu, id_asi } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query("UPDATE nota set ? WHERE id_asi = ? AND id_alu = ?", [req.body, id_asi, id_alu]);
                const procedure = yield datadase_1.default.query("call cali(?,?)", [id_asi, id_alu]);
                res.json({ text: "Se ha actualizado la asignatura al alumno al alumno" });
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
    getOneAsignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_asi } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM asignatura WHERE id_asi = ? ", [id_asi]);
                res.json(query);
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
}
const docenteAsignaturaController = new DocenteAsignaturaController();
exports.default = docenteAsignaturaController;
