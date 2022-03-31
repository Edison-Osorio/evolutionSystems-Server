"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const adminEstudianteRoutes_1 = __importDefault(require("./routes/routesAdmin/adminEstudianteRoutes"));
const adminServiciosRoutes_1 = __importDefault(require("./routes/routesAdmin/adminServiciosRoutes"));
const adminAlu_serRoutes_1 = __importDefault(require("./routes/routesAdmin/adminAlu_serRoutes"));
const adminDocenteRoutes_1 = __importDefault(require("./routes/routesAdmin/adminDocenteRoutes"));
const adminGradoRoutes_1 = __importDefault(require("./routes/routesAdmin/adminGradoRoutes"));
const adminAsignaturaRoutes_1 = __importDefault(require("./routes/routesAdmin/adminAsignaturaRoutes"));
const adminHorarioRoutes_1 = __importDefault(require("./routes/routesAdmin/adminHorarioRoutes"));
const adminDoc_GraRoutes_1 = __importDefault(require("./routes/routesAdmin/adminDoc_GraRoutes"));
const adminNotaRoutes_1 = __importDefault(require("./routes/routesAdmin/adminNotaRoutes"));
const adminDoc_AsiRoutes_1 = __importDefault(require("./routes/routesAdmin/adminDoc_AsiRoutes"));
const adminFacturaRoute_1 = __importDefault(require("./routes/routesAdmin/adminFacturaRoute"));
const routesDocente_1 = __importDefault(require("./routes/rotesDocente/routesDocente"));
const alumnoRoutes_1 = __importDefault(require("./routes/routesAlumno/alumnoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/routesAuth/authRoutes"));
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
        this.app.use('/api/admin/estudiante', adminEstudianteRoutes_1.default); /*listo */
        this.app.use('/api/admin/docente', adminDocenteRoutes_1.default); /**listo */
        this.app.use('/api/admin/servicios', adminServiciosRoutes_1.default); /*listo*/
        this.app.use('/api/admin/alu_ser', adminAlu_serRoutes_1.default); /*listo*/
        this.app.use('/api/admin/grado', adminGradoRoutes_1.default); /*listo */
        this.app.use('/api/admin/asignatura', adminAsignaturaRoutes_1.default); /*listo */
        this.app.use('/api/admin/horario', adminHorarioRoutes_1.default); /*listo*/
        this.app.use('/api/admin/doc_gra', adminDoc_GraRoutes_1.default); /*listo */
        this.app.use('/api/admin/nota', adminNotaRoutes_1.default); /*listo */
        this.app.use('/api/admin/doc_asi', adminDoc_AsiRoutes_1.default); /*listo */
        this.app.use('/api/admin/factura', adminFacturaRoute_1.default); /*listo */
        this.app.use('/api/docente/', routesDocente_1.default); /*listo */
        this.app.use('/api/alumno/', alumnoRoutes_1.default);
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
