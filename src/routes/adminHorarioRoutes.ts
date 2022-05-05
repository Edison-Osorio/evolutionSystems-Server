import { Router } from "express";
import adminHorarioController from "../controllers/adminHorarioController";

class AdminHorarioRoutes {
    router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', adminHorarioController.list);
        this.router.get('/:cod_hor', adminHorarioController.getOneHorario);
        this.router.post('/add', adminHorarioController.createHorario);
        this.router.put('/update/:cod_hor', adminHorarioController.updateHorario);
        this.router.delete('/delete/:cod_hor', adminHorarioController.deleteHorario);
    }
}
const adminHorarioRoutes = new AdminHorarioRoutes();
export default adminHorarioRoutes.router;