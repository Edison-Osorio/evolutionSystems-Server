"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
// Middlewares
const checkAuth_1 = require("./middleware/checkAuth");
const adminEstudianteRoutes_1 = __importDefault(require("./routes/routesAdmin/adminEstudianteRoutes"));
const adminServiciosRoutes_1 = __importDefault(require("./routes/routesAdmin/adminServiciosRoutes"));
const adminAlu_serRoutes_1 = __importDefault(require("./routes/routesAdmin/adminAlu_serRoutes"));
const adminDocenteRoutes_1 = __importDefault(require("./routes/routesAdmin/adminDocenteRoutes"));
const adminCursoRoutes_1 = __importDefault(require("./routes/routesAdmin/adminCursoRoutes"));
const adminAsignaturaRoutes_1 = __importDefault(require("./routes/routesAdmin/adminAsignaturaRoutes"));
const adminHorarioRoutes_1 = __importDefault(require("./routes/routesAdmin/adminHorarioRoutes"));
const adminDoc_GraRoutes_1 = __importDefault(require("./routes/routesAdmin/adminDoc_GraRoutes"));
const adminNotaRoutes_1 = __importDefault(require("./routes/routesAdmin/adminNotaRoutes"));
const adminDoc_AsiRoutes_1 = __importDefault(require("./routes/routesAdmin/adminDoc_AsiRoutes"));
const adminFacturaRoute_1 = __importDefault(require("./routes/routesAdmin/adminFacturaRoute"));
const routesDocente_1 = __importDefault(require("./routes/rotesDocente/routesDocente"));
const alumnoRoutes_1 = __importDefault(require("./routes/routesAlumno/alumnoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/routesAuth/authRoutes"));
const adminBecaRoutes_1 = __importDefault(require("./routes/routesAdmin/adminBecaRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/admin/estudiante', checkAuth_1.checkAuth, adminEstudianteRoutes_1.default); /*listo */
        this.app.use('/api/admin/docente', checkAuth_1.checkAuth, adminDocenteRoutes_1.default); /**listo */
        this.app.use('/api/admin/servicios', checkAuth_1.checkAuth, adminServiciosRoutes_1.default); /*listo*/
        this.app.use('/api/admin/alu_ser', checkAuth_1.checkAuth, adminAlu_serRoutes_1.default); /*listo*/
        this.app.use('/api/admin/curso', checkAuth_1.checkAuth, adminCursoRoutes_1.default); /*listo */
        this.app.use('/api/admin/asignatura', checkAuth_1.checkAuth, adminAsignaturaRoutes_1.default); /*listo */
        this.app.use('/api/admin/horario', checkAuth_1.checkAuth, adminHorarioRoutes_1.default); /*listo*/
        this.app.use('/api/admin/doc_gra', checkAuth_1.checkAuth, adminDoc_GraRoutes_1.default); /*listo */
        this.app.use('/api/admin/nota', checkAuth_1.checkAuth, adminNotaRoutes_1.default); /*listo */
        this.app.use('/api/admin/doc_asi', checkAuth_1.checkAuth, adminDoc_AsiRoutes_1.default); /*listo */
        this.app.use('/api/admin/factura', checkAuth_1.checkAuth, adminFacturaRoute_1.default); /*listo */
        this.app.use('/api/docente/', checkAuth_1.checkAuth, routesDocente_1.default); /*listo */
        this.app.use('/api/alumno/', checkAuth_1.checkAuth, alumnoRoutes_1.default);
        this.app.use('/api/admin/beca/', checkAuth_1.checkAuth, adminBecaRoutes_1.default);
        this.app.use('/api/auth', authRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
