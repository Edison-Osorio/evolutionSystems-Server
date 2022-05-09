import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

// Middlewares
import { checkAuth } from "./middleware/checkAuth";

// Routes of Controllers
import indexRoutes from "./routes/indexRoutes";
import alumnoRouter from "./routes/routesAlumno/alumnoRoutes";
import authRoutes from "./routes/routesAuth/authRoutes";
import asignaturaRouter from "./routes/routesAsignatura/asignaturaRoutes";
import gradoRouter from "./routes/routesGrado/gradoRoutes";
import notaRoutes from "./routes/routesNota/notaRoutes";
import routesDocente from "./routes/routesDocente/routesDocente";
import alumnoServicioRoutes from "./routes/routesAlumno_Servicio/alumnoServicioRoutes";
import becaRoutes from "./routes/routesBeca/becaRoutes";
import serviciosRoutes from './routes/routesServicios/serviciosRoutes';
import horarioRoutes from './routes/routesHorario/horarioRoutes';
import routesAdministrador from "./routes/routesAdministrador/routesAdministrador";
import routesSolicitudes from "./routes/routesSolicitudes/routesSolicitudes";

class Server {
  public app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use(indexRoutes);
    this.app.use("/api/docente", checkAuth, routesDocente); 
    this.app.use("/api/alumno", checkAuth, alumnoRouter);
    this.app.use("/api/grado", checkAuth, gradoRouter);
    this.app.use("/api/asignatura", checkAuth, asignaturaRouter);
    this.app.use("/api/nota", checkAuth, notaRoutes);
    this.app.use('/api/beca/',checkAuth,becaRoutes)
    this.app.use('/api/alumno_servicio', checkAuth, alumnoServicioRoutes);
    this.app.use('/api/servicios', checkAuth, serviciosRoutes);
    this.app.use('/api/horario', checkAuth, horarioRoutes)
    this.app.use('/api/administrador', checkAuth, routesAdministrador)
    this.app.use('/api/solicitudes',checkAuth,routesSolicitudes)
    this.app.use("/api/auth", authRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
