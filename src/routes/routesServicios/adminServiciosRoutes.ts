import { Router } from 'express';
import adminServiciosController from '../../controllers/servicios/adminServiciosController';

class AdminServiciosRoutes {
    router: Router = Router();
    constructor() {
        this.config();
    }


    config(): void {
        this.router.get('/', adminServiciosController.listarServicios);
        this.router.get('/:cod_ser', adminServiciosController.getOneServicio);
        this.router.post('/add', adminServiciosController.createServicio);
        this.router.put('/update/:cod_ser', adminServiciosController.updateServicio);
        this.router.delete('/delete/:cod_ser', adminServiciosController.deleteServicio);
    }
}

const adminServiciosRoutes = new AdminServiciosRoutes();
export default adminServiciosRoutes.router;