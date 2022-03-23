import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';

import adminEstudianteRoutes from "./routes/routesAdmin/adminEstudianteRoutes";
import adminServiciosRoutes from "./routes/routesAdmin/adminServiciosRoutes";
import adminAlu_SerRoutes from "./routes/routesAdmin/adminAlu_serRoutes";
import adminDocenteRoutes from "./routes/routesAdmin/adminDocenteRoutes";
import adminGradoRoutes from "./routes/routesAdmin/adminGradoRoutes";
import adminAsignaturaRoutes from "./routes/routesAdmin/adminAsignaturaRoutes";
import adminHorarioRoutes from "./routes/routesAdmin/adminHorarioRoutes";
import adminDocente_GradoRoutes from "./routes/routesAdmin/adminDoc_GraRoutes";
import adminAsi_AluRoutes from "./routes/routesAdmin/adminAsi_AluRoutes";
import adminDoc_AsiRoutes from "./routes/routesAdmin/adminDoc_AsiRoutes";
import adminFacturaRoute from "./routes/routesAdmin/adminFacturaRoute";
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
        this.app.use(express.urlencoded({extended:false}));
    }

    routes(): void { 
        this.app.use (indexRoutes);
        this.app.use ('/api/admin/estudiante',adminEstudianteRoutes);
        this.app.use ('/api/admin/docente',adminDocenteRoutes);
        this.app.use ('/api/admin/servicios', adminServiciosRoutes);
        this.app.use ('/api/admin/alu_ser', adminAlu_SerRoutes);
        this.app.use ('/api/admin/grado', adminGradoRoutes );
        this.app.use ('/api/admin/asignatura', adminAsignaturaRoutes );
        this.app.use ('/api/admin/horario', adminHorarioRoutes );
        this.app.use ('/api/admin/doc_gra', adminDocente_GradoRoutes );
        this.app.use('/api/admin/asi_alu',adminAsi_AluRoutes);
        this.app.use('/api/admin/doc_asi',adminDoc_AsiRoutes);
        this.app.use('/api/admin/factura',adminFacturaRoute);

        this.app.use('/api/auth', authRoutes)
    }

    start(): void {
        this.app.listen(this.app.get('port'),()=>{
            console.log('server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
    