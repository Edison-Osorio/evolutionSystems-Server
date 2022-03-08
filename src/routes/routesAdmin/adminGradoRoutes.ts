//rutas de los servicios

import { Router } from "express";
import adminGradoController from '../../controllers/admin/adminGradoController';

class AdminGradoRoutes {

    router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', adminGradoController.list);

        this.router.get('/:cod_gra', adminGradoController.getOneGrado);

        this.router.post('/add', adminGradoController.createGrado);

        this.router.put('/update/:cod_gra', adminGradoController.updateGrado);

        this.router.delete('/delete/:cod_gra', adminGradoController.deleteGrado);

    }
}

const adminGradoRoutes = new AdminGradoRoutes();
export default adminGradoRoutes.router;