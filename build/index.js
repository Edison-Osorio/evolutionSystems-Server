"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Middlewares
const checkAuth_1 = require("./middleware/checkAuth");
// Routes of Controllers
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const routesDocente_1 = __importDefault(require("./routes/rotesDocente/routesDocente"));
const alumnoRoutes_1 = __importDefault(require("./routes/routesAlumno/alumnoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/routesAuth/authRoutes"));
const asignaturaRoutes_1 = __importDefault(require("./routes/routesAsignatura/asignaturaRoutes"));
const gradoRoutes_1 = __importDefault(require("./routes/routesGrado/gradoRoutes"));
const notaRoutes_1 = __importDefault(require("./routes/routesNota/notaRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use("/api/docente", checkAuth_1.checkAuth, routesDocente_1.default); /*listo */
        this.app.use("/api/alumno", checkAuth_1.checkAuth, alumnoRoutes_1.default);
        this.app.use("/api/grado", checkAuth_1.checkAuth, gradoRoutes_1.default);
        this.app.use("/api/asignatura", checkAuth_1.checkAuth, asignaturaRoutes_1.default);
        this.app.use("/api/nota", checkAuth_1.checkAuth, notaRoutes_1.default);
        this.app.use("/api/auth", authRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("server on port", this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
