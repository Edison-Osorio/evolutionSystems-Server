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
    // listar todos los servicios
    listarServicios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield datadase_1.default.query('SELECT * FROM servicio');
            res.json(query);
        });
    }
    //crear servicios
    createServicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('INSERT INTO servicio set ?', [req.body]);
                res.json({ message: 'Servicio agregado' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //eliminar servicio
    deleteServicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_ser } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM servicio WHERE id_servicio = ?', [cod_ser]);
                res.json({ text: 'Servicio eliminado con exito' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //actualizar servicio
    updateServicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_ser } = req.params;
                const query = yield datadase_1.default.query('UPDATE servicio SET ? WHERE id_servicio = ?', [req.body, cod_ser]);
                res.json({ message: 'Servicio actualizado' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //listar por cod
    getOneServicio(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_ser } = req.params;
                const query = yield datadase_1.default.query('SELECT * FROM servicio WHERE id_servicio = ? ', [cod_ser]);
                res.json(query[0]);
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminServiciosController = new AdminServiciosController;
exports.default = adminServiciosController;
