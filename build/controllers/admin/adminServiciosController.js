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
class AdminServiciosController {
    // listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const servicio = yield datadase_1.default.query('SELECT * FROM servicio');
            res.json(servicio);
        });
    }
    //crear
    createServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const servicio = yield datadase_1.default.query('INSERT INTO servicio set ?', [req.body]);
            res.json({ message: 'Servicio agregado' });
        });
    }
    //eliminar
    deleteServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod_ser } = req.params;
            const servicio = yield datadase_1.default.query('DELETE FROM servicio ? WHERE cod_ser = ?', [cod_ser]);
            res.json(servicio);
        });
    }
    //actualizar 
    updateServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod_ser } = req.params;
            const servicio = yield datadase_1.default.query('UPDATE servicio SET ? WHERE cod_ser = ?', [req.body, cod_ser]);
            res.json({ message: 'Servicio actualizado' });
        });
    }
    //listar por cod
    getOneServicio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod_ser } = req.params;
            const servicio = yield datadase_1.default.query('SELECT * FROM servicio WHERE cod_ser = ? ', [cod_ser]);
            if (servicio.length > 0) {
                return res.json(servicio);
            }
            res.status(404).json({ text: 'Servicio no encontrado' });
        });
    }
}
const adminServiciosController = new AdminServiciosController;
exports.default = adminServiciosController;
