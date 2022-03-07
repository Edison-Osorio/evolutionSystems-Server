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
const datadase_1 = __importDefault(require("../datadase"));
class AdminAlu_SerController {
    //listar todos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const alu_ser = yield datadase_1.default.query('SELECT * FROM alumno_servicio');
            res.json(alu_ser);
        });
    }
    // crear
    createAlu_Ser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_alu } = req.params;
            const { cod_ser } = req.params;
            const user = yield datadase_1.default.query('SELECT id_alu FROM alumno WHERE id_alu = ?', [id_alu]);
            const service = yield datadase_1.default.query('SELECT cod_ser FROM  servicio WHERE cod_ser = ?', [cod_ser]);
            if (user.length > 0 && service.length > 0) {
                const query = yield datadase_1.default.query("INSERT INTO alumno_servicio set ?", [req.body]);
                res.json('Se ha asignado un servicio al alumno');
            }
            else {
                res.status(404).json({ text: 'No se encontro el alumno o servicio' });
            }
        });
    }
    deleteAlu_Ser(req, res, id_alu) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_alu } = req.params;
            const { cod_ser } = req.params;
            const query = yield datadase_1.default.query('DELETE FROM alumno_servicio WHERE id_alu = ?,[id_alu], AND cod_ser = ?,[cod_ser]');
        });
    }
}
const adminAlu_SerController = new AdminAlu_SerController();
exports.default = adminAlu_SerController;
