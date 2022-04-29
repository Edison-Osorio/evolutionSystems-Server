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
class AdminBecaController {
    //obtener las becas
    list(req, res, next) {
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
    listOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT beca.cod_beca,beca.des_beca,alumno.id_alu,alumno.nom_alu,servicio.tipo_ser,servicio.desc_ser FROM servicio INNER JOIN beca_servicio ON servicio.cod_ser=beca_servicio.cod_servicio INNER JOIN beca ON beca_servicio.codigo_beca= beca.cod_beca INNER JOIN alumno_beca ON beca.cod_beca=alumno_beca.codigo_beca INNER JOIN alumno ON alumno_beca.id_alumno=alumno.id_alu ');
                res.json(query);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    //crear becas
    create(req, res, next) {
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
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_beca } = req.params;
                const query = yield datadase_1.default.query('DELETE FROM beca WHERE cod_beca = ?', [cod_beca]);
                res.json({ text: 'se elimino la beca ' });
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    //actualizar becas 
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_beca } = req.params;
                const query = yield datadase_1.default.query('UPDATE beca set ? WHERE cod_beca = ?', [req.body, cod_beca]);
                res.json(query);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
    // obtener uno 
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_beca } = req.params;
                const query = yield datadase_1.default.query('SELECT * FROM beca WHERE cod_beca =?', [cod_beca]);
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
                const { id_alumno, codigo_beca, cod_servicio } = req.body;
                //const query2 = await pool.query('INSERT INTO alumno_servicio (id_alumno,cod_servicio) VALUES  (?,?)  ',[id_alumno,cod_servicio])
                //res.json(query1);
                const query1 = yield datadase_1.default.query('INSERT INTO alumno_beca (id_alumno,codigo_beca) VALUES (?, ?)', [id_alumno, codigo_beca]);
                //res.json(query2)
                const query3 = yield datadase_1.default.query('INSERT INTO beca_servicio (cod_servicio,codigo_beca) VALUES (?,?) ', [cod_servicio, codigo_beca]);
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
                const { codigo_beca } = req.params;
                const query1 = yield datadase_1.default.query('DELETE FROM alumno_beca WHERE codigo_beca = ? ', [codigo_beca]);
                const query2 = yield datadase_1.default.query('DELETE FROM beca_servicio WHERE codigo_beca = ? ', [codigo_beca]);
                res.json(query2);
            }
            catch (error) {
                console.log('!ERROR ', error);
                next();
            }
        });
    }
}
const adminbecaController = new AdminBecaController();
exports.default = adminbecaController;
