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
class AlumnoController {
    listNotas(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu } = req.params;
                const query = yield datadase_1.default.query('SELECT alumno.nom_alu,asignatura.nom_asi,nota1, nota2,nota3,nota4,nota5,nota_final FROM nota INNER JOIN asignatura ON nota.id_asi=asignatura.id_asi INNER JOIN alumno ON nota.id_alu=alumno.id_alu WHERE nota.id_alu = ? ', [id_alu]);
                res.json({ text: query });
                console.log(query);
            }
            catch (error) {
                console.log('ERROR --->', error);
                next();
            }
        });
    }
    //programador
    listHorario(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu } = req.params;
                const query = yield datadase_1.default.query('SELECT asignatura.nom_asi,horario.fec_hor,horario.hora FROM horario INNER JOIN asignatura ON horario.cod_hor=asignatura.cod_hor INNER JOIN nota ON asignatura.id_asi=nota.id_asi WHERE nota.id_alu=? ', [id_alu]);
                res.json({ text: query });
                console.log(query);
            }
            catch (error) {
                console.log('ERROR --->', error);
                next();
            }
        });
    }
    //servicios
    listServicios(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alu } = req.params;
                const query = yield datadase_1.default.query('SELECT alumno.nom_alu,servicio.tipo_ser,servicio.desc_ser FROM alumno_servicio INNER JOIN alumno ON alumno.id_alu=alumno_servicio.id_alu INNER JOIN servicio on servicio.cod_ser=alumno_servicio.cod_ser WHERE alumno.id_alu=?', [id_alu]);
                res.json({ query });
            }
            catch (error) {
                console.log('ERROR --->', error);
                next();
            }
        });
    }
}
const alumnoController = new AlumnoController();
exports.default = alumnoController;
