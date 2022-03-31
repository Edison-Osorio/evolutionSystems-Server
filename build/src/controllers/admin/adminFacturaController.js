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
class AdminFacturaController {
    //listar todos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield datadase_1.default.query('SELECT servicio.tipo_ser,servicio.desc_ser, factura.cod_fac,factura.cod_ser,factura.fec_fac FROM factura INNER JOIN servicio ON factura.cod_ser=servicio.cod_ser');
            res.json(query);
        });
    }
    // crear
    createFactura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO factura set ?", [req.body]);
                res.json({ text: 'Se ha crado una nueva factura ' });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminar
    deleteFactura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_fac } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM factura WHERE cod_fac = ?', [cod_fac]);
                res.json({ message: 'Se ha eliminado factura' });
            }
            catch (error) {
                console.log('ERROR ----> ', error);
                next();
            }
        });
    }
    //Actualizar
    updateFactura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_fac } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query('UPDATE factura set ? WHERE cod_fac = ?', [req.body, cod_fac]);
                res.json({ text: 'Se ha actualizado la factura' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    getOneFactura(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_fac } = req.params;
                const query = yield datadase_1.default.query('SELECT * FROM factura WHERE cod_fac = ? ', [cod_fac]);
                res.json(query);
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminFacturaController = new AdminFacturaController();
exports.default = adminFacturaController;
