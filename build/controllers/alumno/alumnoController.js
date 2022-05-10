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
    // Listamos todos los alumnos de la tabla de alumno
    listAlumnos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("SELECT * FROM alumno");
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del adminAlumno en listar --> ", error);
                next();
            }
        });
    }
    // Listamos un alumno según su identificador
    listOneAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM alumno WHERE id_alumno = ? ", [id_alumno]);
                res.json(query[0]);
            }
            catch (error) {
                console.log(" Ocurrio un error en el contrador del adminAlumno al listar un solo alumno --> ", error);
            }
        });
    }
    // Listamos un alumno según su identificador para listalos
    listarUnAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("SELECT * FROM alumno WHERE id_alumno = ? ", [id_alumno]);
                res.json(query);
            }
            catch (error) {
                console.log(" Ocurrio un error en el contrador del adminAlumno al listar un solo alumno --> ", error);
            }
        });
    }
    //Listamos los alumnos segun el grado y el grupo
    listAlumnoGradoGrupo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_grado, id_grupo } = req.params;
                const query = yield datadase_1.default.query("SELECT alumno.* FROM alumno INNER JOIN matricula ON alumno.id_alumno = matricula.id_alumno_m WHERE matricula.id_grado_m = ? AND matricula.id_grupo_m = ?  ", [id_grado, id_grupo]);
                res.json(query);
            }
            catch (error) {
                console.log("Ocurrio un error en el controlador de Alumno al listar los alumnos según el grado y el grupo");
            }
        });
    }
    // Listamos un alumno según su identificador con su grado
    listOneAlumnoWhitGrado(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("SELECT alumno.nombre_alumno,alumno.id_alumno, alumno.fecha_nacimiento,grupo.nombre_grupo,grado.nombre_grado FROM alumno INNER JOIN matricula ON alumno.id_alumno=matricula.id_alumno_m INNER JOIN grado ON matricula.id_grado_m=grado.id_grado INNER JOIN grado_grupo ON grado.id_grado=grado_grupo.id_grado_grg INNER JOIN grupo ON grado_grupo.id_grupo_grg=grupo.id_grupo WHERE grupo.id_grupo=matricula.id_grupo_m AND alumno.id_alumno=? ", [id_alumno]);
                res.json(query[0]);
            }
            catch (error) {
                console.log(" Ocurrio un error en el contrador del adminAlumno al listar un solo alumno --> ", error);
            }
        });
    }
    //   Creamos un alumno en la tabla alumno
    createAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield datadase_1.default.query("INSERT INTO alumno SET ? ", [req.body]);
                res.json({ msg: "Alumno creado" });
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Alumno al crear el alumno --> ", error);
                next();
            }
        });
    }
    // Actualizamos un alumno segun su identificador
    updateAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("UPDATE alumno SET ? WHERE id_alumno = ? ", [
                    req.body,
                    id_alumno,
                ]);
                res.json({ msg: "Alumno Actualizado" });
            }
            catch (error) {
                console.log(" Ocurrio un error en el contrador del Alumno al actualizar un alumno--> ", error);
            }
        });
    }
    // Eliminamos el alumno
    deleteAlumno(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const query = yield datadase_1.default.query("");
            }
            catch (error) {
                console.log("Ocurrio un error en el contrador del Alumno al eliminar un alumno un alumno --> ", error);
                next();
            }
        });
    }
}
const alumnoController = new AlumnoController();
exports.default = alumnoController;
