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
class AdminEstudianteController {
    //listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const alumno = yield datadase_1.default.query('SELECT * FROM alumno');
            res.json(alumno);
        });
    }
    //crear
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield datadase_1.default.query('INSERT INTO alumno set ?', [req.body]);
            res.json({ message: 'Alumno guardado' });
        });
    }
    //borrar
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_alu } = req.params;
            const alumno = yield datadase_1.default.query('DElETE FROM alumno WHERE id_alu = ?', [id_alu]);
            res.json({ message: 'alumno eliminado' });
        });
    }
    //actualizar 
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_alu } = req.params;
            const alumno = yield datadase_1.default.query('UPDATE alumno set ? WHERE id_alu = ?', [req.body, id_alu]);
            res.json({ message: 'Alumno modificado' });
        });
    }
    //listar solo por id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_alu } = req.params;
            const alumno = yield datadase_1.default.query('SELECT * FROM alumno WHERE id_alu = ?', [id_alu]);
            if (alumno.length > 0) {
                return res.json(alumno);
            }
            res.status(404).json({ text: 'No se encontro el alumno ' });
            res.json({ text: 'Alumno encontrado' });
        });
    }
}
const adminEstudianteController = new AdminEstudianteController();
exports.default = adminEstudianteController;
