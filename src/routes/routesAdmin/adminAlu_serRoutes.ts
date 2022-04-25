import { Router } from "express";
import adminAlu_SerController from "../../controllers/admin/adminAlu_SerController";

class AdminAlu_Ser {
    router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', adminAlu_SerController.list);
        this.router.get('/:id_alumno/:cod_servicio', adminAlu_SerController.getOne);
        this.router.post('/add', adminAlu_SerController.createAlu_Ser);
        this.router.delete('/delete/:id_alumno/:cod_servicio', adminAlu_SerController.deleteAlu_Ser);
        this.router.put('/update/:id_alu/:cod_ser', adminAlu_SerController.updateAlu_Ser);
    }
}
const adminAlu_SerRoutes = new AdminAlu_Ser();
export default adminAlu_SerRoutes.router;