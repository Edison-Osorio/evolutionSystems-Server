//rutas de los servicios

import { Router } from "express";
import adminEstudianteController from '../../controllers/admin/adminEstudianteController';

class AdminRoutes {

    router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', adminEstudianteController.list);

        this.router.get('/:id_alu', adminEstudianteController.getOne);

        this.router.post('/add', adminEstudianteController.create);

        this.router.put('/:id_alu', adminEstudianteController.update);

        this.router.delete('/:id_alu', adminEstudianteController.delete);

    }
}

const adminEstudiantenRoutes = new AdminRoutes();
export default adminEstudiantenRoutes.router;