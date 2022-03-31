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
class AdminHorarioController {
    //listar todos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield datadase_1.default.query('SELECT * FROM horario');
            res.json(query);
        });
    }
    // crear
    createHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO horario set ? ", [req.body]);
                res.json({ text: 'Se ha crado un nuevo horario ' });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminar
    deleteHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_hor } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM horario WHERE cod_hor = ?', [cod_hor]);
                res.json({ message: 'Se ha eliminado el horario' });
            }
            catch (error) {
                console.log('ERROR ----> ', error);
                next();
            }
        });
    }
    //Actualizar
    updateHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_hor } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query('UPDATE horario set ? WHERE cod_hor = ?', [req.body, cod_hor]);
                res.json({ text: 'Se ha actualizado horario' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    getOneHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_hor } = req.params;
                const query = yield datadase_1.default.query('SELECT * FROM horario WHERE cod_hor = ? ', [cod_hor]);
                res.json(query);
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminHorarioController = new AdminHorarioController();
exports.default = adminHorarioController;
