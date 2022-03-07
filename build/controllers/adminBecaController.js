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
class AdminBecaController {
    // listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const beca = yield datadase_1.default.query('SELECT * FROM beca');
            res.json(beca);
        });
    }
    //crear
    createBeca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_alu } = req.params;
            //pool alumno=id>1 otro pool
            const beca = yield datadase_1.default.query('INSERT INTO beca set ? ', [req.body]);
            res.json({ message: 'Beca creada' });
        });
    }
    deleteBeca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
