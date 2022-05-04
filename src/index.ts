import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

// Middlewares
import { checkAuth } from "./middleware/checkAuth";

// Routes of Controllers
import indexRoutes from "./routes/indexRoutes";
import routesDocente from "./routes/rotesDocente/routesDocente";
import alumnoRouter from "./routes/routesAlumno/alumnoRoutes";
import authRoutes from "./routes/routesAuth/authRoutes";
import asignaturaRouter from "./routes/routesAsignatura/asignaturaRoutes";
import gradoRouter from "./routes/routesGrado/gradoRoutes";
import notaRoutes from "./routes/routesNota/notaRoutes";

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
    this.app.use("/api/docente", checkAuth, routesDocente); /*listo */
    this.app.use("/api/alumno", checkAuth, alumnoRouter);
    this.app.use("/api/grado", checkAuth, gradoRouter);
    this.app.use("/api/asignatura", checkAuth, asignaturaRouter);
    this.app.use("/api/nota", checkAuth, notaRoutes);
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
