"use strict";
//rutas de los servicios
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
class GamesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', adminController_1.default.list);
        this.router.get('/docente', adminController_1.default.listDocente);
        this.router.get('/:id_alu', adminController_1.default.getOne);
        this.router.get('/:nif_doc', adminController_1.default.getOneDocente);
        this.router.post('/add', adminController_1.default.create);
        this.router.post('/docente/add', adminController_1.default.createDocente);
        this.router.put('/:id_alu', adminController_1.default.update);
        this.router.delete('/:id_alu', adminController_1.default.delete);
    }
}
const gamesRoutes = new GamesRoutes();
exports.default = gamesRoutes.router;
