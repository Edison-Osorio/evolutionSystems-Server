"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docenteController_1 = __importDefault(require("../../controllers/docente/docenteController"));
class DocenteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Routes of docente
        this.router.get('/', docenteController_1.default.listDocente);
        this.router.get('/categoria', docenteController_1.default.listCategoria);
        this.router.get('/:nif_docente', docenteController_1.default.listOnDocente);
        this.router.get('/unDocente/:nif_docente', docenteController_1.default.listUnDocente);
        this.router.post('/add-docente', docenteController_1.default.createDocente);
        this.router.put('/update/:nif_docente', docenteController_1.default.updateDocente);
        this.router.delete('/delete/:nif_docente', docenteController_1.default.deleteDocente);
        // this.router.put('/updateNote/:id_asi/:id_alu', docenteAsignaturaController.updateNota);
        // this.router.get('/:nif_doc', docenteAsignaturaController.list);
        // this.router.get('/asignatura/:nif_doc', docenteAsignaturaController.listAsignaturaDocente)
        // this.router.get('/programador/:nif_doc', docenteAsignaturaController.listProgramador)
        // this.router.get('/:nif_doc/:id_asi', docenteAsignaturaController.getOneAsignatura);
        // this.router.get('/doc_gra/:nif_doc/:cod_gra', docenteAsignaturaController.listGroup);
    }
}
const docenteRoutes = new DocenteRoutes();
exports.default = docenteRoutes.router;
