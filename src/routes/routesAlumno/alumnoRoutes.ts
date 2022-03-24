import { Router } from "express";
import alumnoController from "../../controllers/alumno/alumnoController";


class AlumnoRouter {
    router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/notas/:id_alu', alumnoController.listNotas);
        this.router.get('/horario/:id_alu', alumnoController.listHorario);
        this.router.get('/servicios/:id_alu', alumnoController.listServicios);
    }
}

const alumnoRouter = new AlumnoRouter();
export default alumnoRouter.router;