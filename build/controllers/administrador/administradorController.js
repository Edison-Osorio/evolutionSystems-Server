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
class AdministradorController {
    // trae todos los administradores 
    listarTodos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT documento,nombre,email FROM usuario WHERE rol like '%administrador%'");
                res.json(query);
            }
            catch (error) {
                console.log('!ERROR --> ', error);
                next();
            }
        });
    }
    // elimina el administrador 
    deleteAdministrador(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documento } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM usuario WHERE documento = ?", [documento]);
                res.json('Se elimino con exito');
            }
            catch (error) {
                console.log('!ERROR --> ', error);
            }
        });
    }
    //obtiene un solo administrador
    getOneAdministrador(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documento } = req.params;
                const query = yield datadase_1.default.query('SELECT tipoDocumento,documento,nombre,email FROM usuario WHERE documento = ?', [documento]);
                res.json(query[0]);
            }
            catch (error) {
                console.log('!ERROR --> ', error);
            }
        });
    }
    // actualiza el administrador
    updateAdministrador(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { documento } = req.params;
                const query = yield datadase_1.default.query('UPDATE usuario set ? WHERE documento = ? ', [req.body, documento]);
                res.json('se actualizo');
            }
            catch (error) {
                console.log(error);
                next();
            }
        });
    }
}
const administradorController = new AdministradorController();
exports.default = administradorController;
