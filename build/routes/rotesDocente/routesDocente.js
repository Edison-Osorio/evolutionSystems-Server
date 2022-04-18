"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docenteAsignaturaController_1 = __importDefault(require("../../controllers/docente/docenteAsignaturaController"));
class DocenteRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.put('/updateNote/:id_asi/:id_alu', docenteAsignaturaController_1.default.updateNota);
        this.router.get('/:nif_doc', docenteAsignaturaController_1.default.list);
        this.router.get('/asignatura/:nif_doc', docenteAsignaturaController_1.default.listAsignaturaDocente);
        this.router.get('/programador/:nif_doc', docenteAsignaturaController_1.default.listProgramador);
        this.router.get('/:nif_doc/:id_asi', docenteAsignaturaController_1.default.getOneAsignatura);
        this.router.get('/doc_gra/:nif_doc/:cod_gra', docenteAsignaturaController_1.default.listGroup);
    }
}
const docenteRoutes = new DocenteRoutes();
exports.default = docenteRoutes.router;
