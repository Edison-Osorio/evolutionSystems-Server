import { Router } from "express";
import adminAlu_SerController from "../../controllers/alumno_Servicio/adminAlu_SerController";

class AdminAlu_Ser {
    router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', adminAlu_SerController.listarAlumno_Servicio);
        this.router.get('/:id_alumno/:cod_servicio', adminAlu_SerController.getOneAlumno_Servicio);
        this.router.post('/add', adminAlu_SerController.createAlumno_Servicio);
        this.router.delete('/delete/:id_alumno/:cod_servicio', adminAlu_SerController.deleteAlumno_Servicio);
        this.router.put('/update/:id_alu/:cod_ser', adminAlu_SerController.updateAlumno_Servicio);
    }
}
const adminAlu_SerRoutes = new AdminAlu_Ser();
export default adminAlu_SerRoutes.router;