import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';

import adminDocenteRoutes from "./routes/adminDocenteRoutes";
import adminEstudianteRoutes from "./routes/adminEstudianteRoutes";
import adminServiciosRoutes from "./routes/adminServiciosRoutes";
import adminAlu_SerRoutes from "./routes/routesAdmin/adminAlu_serRoutes"
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
    }

    start(): void {
        this.app.listen(this.app.get('port'),()=>{
            console.log('server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();