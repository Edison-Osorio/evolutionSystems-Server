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
class AdminDocente_AsignaturaController {
    //listar todos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield datadase_1.default.query('SELECT docente.nom_doc,docente.nif_doc,docente.dir_doc,docente.fec_nac_doc,docente.tel_doc,docente.dat_ban_doc,docente.area_doc, asignatura.nom_asi,asignatura.desc_asi FROM asignatura INNER JOIN docente_asignatura ON asignatura.id_asi=docente_asignatura.id_asi INNER JOIN docente ON docente_asignatura.nif_doc=docente.nif_doc');
            res.json(query);
        });
    }
    // crear
    createDocente_Asignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO docente_asignatura set ?", [req.body]);
                res.json({ text: 'Se le ha asignado una asignatura al docente' });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminar
    deleteDocente_Asignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc, id_asi } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM docente_asignatura WHERE nif_doc = ? AND id_asi =?', [nif_doc, id_asi]);
                res.json({ message: 'Se le ha eliminado el grado al docente' });
            }
            catch (error) {
                console.log('ERROR ----> ', error);
                next();
            }
        });
    }
    //Actualizar
    updateDocente_Asignatura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc, id_asi } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query('UPDATE docente_asignatura set ? WHERE nif_doc = ? AND id_asi = ?', [req.body, nif_doc, id_asi]);
                res.json({ text: 'Se ha actualizado la asignatura al docente' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminDocente_AsignaturaController = new AdminDocente_AsignaturaController();
exports.default = adminDocente_AsignaturaController;
