import { Router } from "express";
import solicitudesController from "../../controllers/solicitudes/solucitudesController";

class SolicitudesRoutes {
    router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.get('/', solicitudesController.listSolicitudes)
        this.router.post('/add', solicitudesController.guardarSolicitud)
        this.router.delete('/delete/:id_mensaje', solicitudesController.eliminarSolicitud)
        this.router.delete('/delete-mensaje-alumno/:id_alumno', solicitudesController.eliminarSolicitudAlumno)
        this.router.get('/total',solicitudesController.contarSolicitudes)
    }
}
const solicitudesRoutes = new SolicitudesRoutes();
export default solicitudesRoutes.router;