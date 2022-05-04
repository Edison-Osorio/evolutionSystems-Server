"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class HorarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
    }
}
const horarioRoutes = new HorarioRoutes();
exports.default = horarioRoutes.router;
