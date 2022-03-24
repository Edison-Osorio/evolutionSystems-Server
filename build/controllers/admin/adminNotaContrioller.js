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
class AdminNotaController {
    //listar todos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield datadase_1.default.query('SELECT alumno.nom_alu, nota1,nota2,nota3,nota4,nota5,nota_final FROM nota INNER JOIN alumno ON nota.id_alu=alumno.id_alu');
            res.json(query);
        });
    }
    //listar uno
    listOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { alu_id } = req.params;
                const query = yield datadase_1.default.query('CALL getOneAlumno(?)', [alu_id]);
                res.json(query);
            }
            catch (error) {
                console.log('ERROR ----->', error);
                next();
            }
        });
    }
    // crear
    createNota(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO nota set ?", [req.body]);
                res.json({ text: 'Se ha asignado una asignatura al alumno' });
                res.json({ text: query });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminar
    deleteNota(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu, id_asi } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM nota WHERE id_asi = ? AND id_alu =?', [id_asi, id_alu]);
                res.json({ message: 'Se ha eliminado la asignatura al alumno' });
            }
            catch (error) {
                console.log('ERROR ----> ', error);
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
                const query = yield datadase_1.default.query('UPDATE nota set ? WHERE id_asi = ? AND id_alu = ?', [req.body, id_asi, id_alu]);
                const procedure = yield datadase_1.default.query('call cali(?,?)', [id_asi, id_alu]);
                res.json({ text: 'Se ha actualizado la asignatura al alumno al alumno' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminNotaController = new AdminNotaController();
exports.default = adminNotaController;
/*select alumno.nom_alu, nota1,nota2,nota3,nota4,nota5,nota_final FROM nota INNER JOIN alumno on nota.id_alu=alumno.id_alu WHERE alumno.id_alu=?; */ 
