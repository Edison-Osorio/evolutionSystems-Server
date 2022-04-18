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
class AdminGradoController {
    //listar todos
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM curso INNER JOIN ciclo on curso.id_ciclo = ciclo.id_ciclo");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error -->", error);
                next();
            }
        });
    }
    listCiclo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT * FROM ciclo');
                res.json(query);
            }
            catch (error) {
                console.log('Ocuriro un erro listando los ciclos', error);
                next();
            }
        });
    }
    listGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query('SELECT * FROM grupo');
                res.json(query);
            }
            catch (error) {
                console.log('Ocurrio un error listando los grupos', error);
                next();
            }
        });
    }
    // crear
    createCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO curso set ?", [req.body]);
                res.json({ text: "Se ha crado un nuevo grado" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //eliminar
    deleteCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_gra } = req.params;
                const query = yield datadase_1.default.query("DELETE FROM grado WHERE cod_gra = ?", [
                    cod_gra,
                ]);
                res.json({ message: "Se ha eliminado el grado" });
            }
            catch (error) {
                console.log("ERROR ----> ", error);
                next();
            }
        });
    }
    //Actualizar
    updateCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_gra } = req.params;
                console.log(req.body);
                const query = yield datadase_1.default.query("UPDATE grado set ? WHERE cod_gra = ?", [
                    req.body,
                    cod_gra,
                ]);
                res.json({ text: "Se ha actualizado el servicio al alumno" });
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
    getOneCurso(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cod_gra } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM grado WHERE cod_gra = ? ", [
                    cod_gra,
                ]);
                res.json(query[0]);
            }
            catch (error) {
                console.log("ERROR ---->", error);
                next();
            }
        });
    }
}
const adminGradoController = new AdminGradoController();
exports.default = adminGradoController;
