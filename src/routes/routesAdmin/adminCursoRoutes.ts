//rutas de los servicios

import { Router } from "express";
import adminCursoController from '../../controllers/admin/adminCursoController';

class AdminGradoRoutes {

    router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', adminCursoController.list);

        this.router.get('/ciclo', adminCursoController.listCiclo)
        this.router.get('/grupo', adminCursoController.listGrupo)

        this.router.get('/:cod_gra', adminCursoController.getOneCurso);

        this.router.post('/add', adminCursoController.createCurso);

        this.router.put('/update/:cod_gra', adminCursoController.updateCurso);

        this.router.delete('/delete/:cod_gra', adminCursoController.deleteCurso);

    }
}

const adminGradoRoutes = new AdminGradoRoutes();
export default adminGradoRoutes.router;