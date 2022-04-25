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
class AdminDocenteController {
    // 1 listar docentes
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT docente.*, categoria.tipo FROM docente INNER JOIN categoria ON docente.id_categoria = categoria.id_categoria');
                res.json(query);
            }
            catch (error) {
                console.log('Ocurri un error -->', error);
                next();
            }
        });
    }
    // Listar coategorias
    listCategorias(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT * FROM categoria');
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un Error -->', error);
                next();
            }
        });
    }
    // 2 crear
    createDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query(`INSERT INTO docente set ?`, [req.body]);
                res.json({ message: 'Docente guardado' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //3 borrar
    deleteDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM docente WHERE nif_doc = ?', [nif_doc]);
                res.json({ message: 'Docente eliminado' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //4 actualizar 
    updateDocente(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc } = req.params;
                const query = yield datadase_1.default.query('UPDATE docente set ? WHERE nif_doc = ?', [req.body, nif_doc]);
                res.json({ query });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //5 listar por nif
    getOneDocent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nif_doc } = req.params;
                const query = yield datadase_1.default.query('SELECT * FROM docente WHERE nif_doc = ?', [nif_doc]);
                res.json(query[0]);
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminDocenteController = new AdminDocenteController();
exports.default = adminDocenteController;
