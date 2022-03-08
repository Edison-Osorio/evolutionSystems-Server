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
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield datadase_1.default.query('SELECT * FROM asignatura');
            res.json(query);
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
                const query = yield datadase_1.default.query('SELECT * FROM asignatura WHERE id_asi = ? ', [id_asi]);
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
