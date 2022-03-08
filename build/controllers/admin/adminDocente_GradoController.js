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
class AdminDocente_GradoController {
    //listar todos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const alu_ser = yield datadase_1.default.query('SELECT * FROM docente_grado');
            res.json(alu_ser);
        });
    }
    // crear
    createDocente_Grado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO docente_grado set ?", [req.body]);
                res.json({ text: 'Se le ha asignado un nuevo grado al docente' });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminar
    deleteDocente_Grado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_gra, nif_doc } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM docente_grado WHERE cod_gra = ? AND nif_doc =?', [cod_gra, nif_doc]);
                res.json({ message: 'Se le ha eliminado el grado al docente' });
            }
            catch (error) {
                console.log('ERROR ----> ', error);
                next();
            }
        });
    }
    //Actualizar
    updateDocente_Grado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_gra, nif_doc } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query('UPDATE docente_grado set ? WHERE cod_gra = ? AND nif_doc = ?', [req.body, cod_gra, nif_doc]);
                res.json({ text: 'Se ha actualizado el grado al docente' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminDocente_GradoController = new AdminDocente_GradoController();
exports.default = adminDocente_GradoController;
