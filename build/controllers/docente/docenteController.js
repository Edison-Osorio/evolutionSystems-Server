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
class DocenteController {
    //Listamos todos los docentes
    listDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM docente");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del docente al listar los docentes --> ", error);
                next();
            }
        });
    }
    //Listamos un docente por su identificador
    listOnDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_docente } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM docente WHERE nif_docente = ? ", [nif_docente]);
                res.json(query[0]);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del docente al lista un docente --> ", error);
                next();
            }
        });
    }
    //Actualizamos un docente
    updateDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_docente } = req.params;
                const query = yield datadase_1.default.query("UPDATE docente SET ? WHERE nif_docente = ? ", [req.body, nif_docente]);
                res.json({ msg: "Docente Actualizado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Docente al actualizar un docente --> ", error);
                next();
            }
        });
    }
    //Eliminamos un docente por su identificador
    deleteDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_docente } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM docente WHERE nif_docente = ? ", [nif_docente]);
                res.json({ msg: 'Docente Eliminado' });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Docente al eliminar un docente --> ", error);
                next();
            }
        });
    }
}
const docenteController = new DocenteController();
exports.default = docenteController;
