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
class AdminEstudianteController {
    //listar
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield datadase_1.default.query('SELECT alumno.*, curso.nombre_curso, grupo.nombre_grupo FROM curso INNER JOIN alumno on curso.id_curso = alumno.id_curso INNER JOIN grupo on alumno.id_grupo = grupo.id_grupo');
            res.json(query);
        });
    }
    listAlum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cod_gra } = req.params;
            const query = yield datadase_1.default.query('SELECT alumno.id_alu,alumno.nom_alu, alumno.tel_alu, alumno.dire_alu, alumno.tel_alu,alumno.fec_alu, alumno.nom_pa, alumno.nom_ma, alumno.dat_ban_alu  FROM grado INNER JOIN  alumno ON grado.cod_gra=alumno.cod_gra WHERE alumno.cod_gra= ?', [cod_gra]);
            res.json(query);
        });
    }
    //crear
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('INSERT INTO alumno set ? ', [req.body]);
                res.json({ message: 'Alumno guardado' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //borrar
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM alumno WHERE id_alu = ? ', [id_alu]);
                //DElETE FROM alumno WHERE id_alu = ?
                res.json({ message: 'alumno eliminado' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //actualizar 
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu } = req.params;
                const query = yield datadase_1.default.query('UPDATE alumno set ? WHERE id_alu = ?', [req.body, id_alu]);
                res.json({ message: 'Alumno modificado' });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
    //listar solo por id
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu } = req.params;
                const query = yield datadase_1.default.query('SELECT * FROM alumno WHERE id_alu =? ', [id_alu]);
                res.json({ text: query });
            }
            catch (error) {
                console.log('ERROR ---->', error);
                next();
            }
        });
    }
}
const adminEstudianteController = new AdminEstudianteController();
exports.default = adminEstudianteController;
