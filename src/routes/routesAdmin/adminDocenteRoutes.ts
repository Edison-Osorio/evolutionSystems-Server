import { Router } from "express";
import adminDocenteController from '../../controllers/admin/adminDocenteController'

class AdminDocenteRoutes {
    router: Router= Router();
    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/', adminDocenteController.list);
        this.router.get('/:nif_doc', adminDocenteController.getOneDocente);
        this.router.post('/add', adminDocenteController.createDocente);
        this.router.put('/:nif_doc', adminDocenteController.updateDocente);
        this.router.delete('/:nif_doc', adminDocenteController.deleteDocente);
    }
}

const adminDocenteRoutes = new AdminDocenteRoutes();
export default adminDocenteRoutes.router;