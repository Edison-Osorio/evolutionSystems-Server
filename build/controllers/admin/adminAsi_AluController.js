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
class AdminAsi_AluController {
    //listar todos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield datadase_1.default.query('SELECT * FROM asignatura_alumno');
            res.json(query);
        });
    }
    // crear
    createAsi_Alu(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO asignatura_alumno set ?", [req.body]);
                res.json({ text: 'Se ha asignado una asignatura al alumno' });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminar
    deleteAsi_Alu(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu, id_asi } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM asignatura_alumno WHERE id_alu = ? AND id_asi =?', [id_alu, id_asi]);
                res.json({ message: 'Se ha eliminado la asignatura al alumno' });
            }
            catch (error) {
                console.log('ERROR ----> ', error);
                next();
            }
        });
    }
    //Actualizar
    updateAsi_Alu(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu, id_asi } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query('UPDATE asignatura_alumno set ? WHERE id_alu = ? AND id_asi = ?', [req.body, id_alu, id_asi]);
                res.json({ text: 'Se ha actualizado la asignatura al alumno al alumno' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminAsi_AluController = new AdminAsi_AluController();
exports.default = adminAsi_AluController;
