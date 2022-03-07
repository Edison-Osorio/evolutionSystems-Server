import {Router} from 'express';
import adminServiciosController from '../../controllers/admin/adminServiciosController';

class AdminServiciosRoutes{
    router: Router = Router();
    constructor(){
        this.config();
    }


    config(): void{
        this.router.get('/', adminServiciosController.list);
        this.router.get('/:cod_ser', adminServiciosController.getOneServicio);
        this.router.post('/add',adminServiciosController.createServicio);
        this.router.put('/:cod_ser', adminServiciosController.updateServicio);
        this.router.delete('/:cod_ser', adminServiciosController.deleteServicio);
    }
}

const adminServiciosRoutes = new AdminServiciosRoutes();
export default adminServiciosRoutes.router;