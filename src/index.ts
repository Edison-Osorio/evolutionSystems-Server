import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';

// Middlewares

import {checkAuth} from './middleware/checkAuth'

import adminEstudianteRoutes from "./routes/routesAdmin/adminEstudianteRoutes";
import adminServiciosRoutes from "./routes/routesAdmin/adminServiciosRoutes";
import adminAlu_SerRoutes from "./routes/routesAdmin/adminAlu_serRoutes";
import adminDocenteRoutes from "./routes/routesAdmin/adminDocenteRoutes";
import adminGradoRoutes from "./routes/routesAdmin/adminGradoRoutes";
import adminAsignaturaRoutes from "./routes/routesAdmin/adminAsignaturaRoutes";
import adminHorarioRoutes from "./routes/routesAdmin/adminHorarioRoutes";
import adminDocente_GradoRoutes from "./routes/routesAdmin/adminDoc_GraRoutes";
import adminNotaRoutes from "./routes/routesAdmin/adminNotaRoutes";
import adminDoc_AsiRoutes from "./routes/routesAdmin/adminDoc_AsiRoutes";
import adminFacturaRoute from "./routes/routesAdmin/adminFacturaRoute";
import routesDocente from "./routes/rotesDocente/routesDocente";
import alumnoRoutes from "./routes/routesAlumno/alumnoRoutes";
import authRoutes from "./routes/routesAuth/authRoutes";

class Server {
    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(morgan('dev'))
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use(indexRoutes);
        this.app.use('/api/admin/estudiante', checkAuth, adminEstudianteRoutes);/*listo */
        this.app.use('/api/admin/docente',checkAuth, adminDocenteRoutes);/**listo */
        this.app.use('/api/admin/servicios', checkAuth, adminServiciosRoutes);/*listo*/
        this.app.use('/api/admin/alu_ser', checkAuth, adminAlu_SerRoutes);/*listo*/
        this.app.use('/api/admin/grado', checkAuth, adminGradoRoutes);/*listo */
        this.app.use('/api/admin/asignatura', checkAuth, adminAsignaturaRoutes);/*listo */
        this.app.use('/api/admin/horario', checkAuth, adminHorarioRoutes);/*listo*/
        this.app.use('/api/admin/doc_gra', checkAuth, adminDocente_GradoRoutes);/*listo */
        this.app.use('/api/admin/nota', checkAuth, adminNotaRoutes);/*listo */
        this.app.use('/api/admin/doc_asi', checkAuth, adminDoc_AsiRoutes);/*listo */
        this.app.use('/api/admin/factura', checkAuth, adminFacturaRoute);/*listo */
        this.app.use('/api/docente/', checkAuth, routesDocente);/*listo */
        this.app.use('/api/alumno/', checkAuth, alumnoRoutes);
        this.app.use('/api/auth', authRoutes)

    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
    