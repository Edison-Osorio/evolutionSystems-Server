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
class BecaController {
    //obtener las becas disponibles
    listarBecasDisponibles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM beca WHERE cupo !=0 ");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error -->", error);
                next();
            }
        });
    }
    // obtener todas las becas
    listarBecas(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM beca ");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error -->", error);
                next();
            }
        });
    }
    // listar alumnos con becas y el servicio que los cubre 
    listOneBeca(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT beca.codigo_beca,beca.descripcion,alumno.id_alumno,alumno.nombre_alumno FROM alumno INNER JOIN alumno_beca ON alumno.id_alumno=alumno_beca.id_alumno_ab INNER JOIN beca ON alumno_beca.codigo_beca_ab=beca.codigo_beca ');
                res.json(query);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    //crear becas
    createBeca(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('INSERT INTO beca SET  ?', [req.body]);
                res.json({ text: 'se creo la beca' });
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    //eliminar becas
    deleteBeca(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_beca } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM beca WHERE codigo_beca = ?', [cod_beca]);
                res.json({ text: 'se elimino la beca ' });
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    //actualizar becas 
    updateBeca(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_beca } = req.params;
                const query = yield datadase_1.default.query('UPDATE beca set ? WHERE codigo_beca = ?', [req.body, cod_beca]);
                res.json(query);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    // obtener uno 
    getOnebeca(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigo_beca } = req.params;
                const query = yield datadase_1.default.query('SELECT * FROM beca WHERE codigo_beca =?', [codigo_beca]);
                res.json(query[0]);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    // asignar beca a alumno con servicio 
    createBecaAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno, codigo_beca, id_servicio } = req.body;
                //res.json(query1);
                const query1 = yield datadase_1.default.query('INSERT INTO alumno_beca (id_alumno_ab,codigo_beca_ab) VALUES (?, ?)', [id_alumno, codigo_beca]);
                const query2 = yield datadase_1.default.query('UPDATE beca SET cupo = cupo-1 WHERE beca.codigo_beca= ? ', [codigo_beca]);
                //res.json(query2)
                const query3 = yield datadase_1.default.query('INSERT INTO beca_servicio (codigo_servicio_bs,codigo_beca_bs) VALUES (?,?) ', [id_servicio, codigo_beca]);
                res.json(query1);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    //eliminar beca del alumno 
    deleteBecaAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { codigo_beca, id_alumno } = req.params;
                const query1 = yield datadase_1.default.query('DELETE FROM alumno_beca WHERE id_alumno_ab =? ', [id_alumno]);
                const query2 = yield datadase_1.default.query('DELETE FROM beca_servicio WHERE codigo_beca_bs = ? ', [codigo_beca]);
                res.json(query2);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    //eliminar beca del alumno según el identificador de la beca
    deleteBecaAlumnosAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query1 = yield datadase_1.default.query('DELETE FROM alumno_beca WHERE id_alumno_ab =? ', [id_alumno]);
                res.json(query1);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    //obtener la beca de un alumno 
    getBecaAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query('SELECT alumno.id_alumno, alumno.nombre_alumno, beca.descripcion,servicio.id_servicio,servicio.tipo_servicio,beca.codigo_beca FROM alumno INNER JOIN alumno_beca ON alumno.id_alumno=alumno_beca.id_alumno_ab INNER JOIN beca ON alumno_beca.codigo_beca_ab=beca.codigo_beca INNER JOIN beca_servicio ON beca.codigo_beca=beca_servicio.codigo_beca_bs INNER JOIN servicio ON beca_servicio.codigo_servicio_bs=servicio.id_servicio WHERE alumno_beca.id_alumno_ab=? AND alumno_beca.codigo_beca_ab=beca_servicio.codigo_beca_bs LIMIT 1', [id_alumno]);
                res.json(query);
            }
            catch (error) {
                console.log('!ERROR --> ', error);
                next();
            }
        });
    }
}
const becaController = new BecaController();
exports.default = becaController;
