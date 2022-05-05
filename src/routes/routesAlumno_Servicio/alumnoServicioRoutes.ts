import { Router } from "express";
import alumnoServicioController from "../../controllers/alumno_Servicio/alumno_ServicioController";



class AlumnoServicio {
    router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', alumnoServicioController.listarAlumno_Servicio);
        this.router.get('/:id_alumno/:cod_servicio', alumnoServicioController.getOneAlumno_Servicio);
        this.router.post('/add', alumnoServicioController.createAlumno_Servicio);
        this.router.delete('/delete/:id_alumno/:cod_servicio', alumnoServicioController.deleteAlumno_Servicio);
        this.router.put('/update/:id_alu/:cod_ser', alumnoServicioController.updateAlumno_Servicio);
    }
}
const alumnoServicioRoutes = new AlumnoServicio();
export default alumnoServicioRoutes.router;