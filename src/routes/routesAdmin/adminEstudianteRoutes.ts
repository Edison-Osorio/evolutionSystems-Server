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
        this.router.get('/:cod_gra',adminEstudianteController.listAlum)
        this.router.get('/estudiante/:id_alu', adminEstudianteController.getOne);
        this.router.post('/add', adminEstudianteController.create);
        this.router.post('/addMatricula', adminEstudianteController.createMatricula)
        this.router.put('/update/:id_alu', adminEstudianteController.update);
        this.router.delete('/delete/:id_alu', adminEstudianteController.delete);
        this.router.delete('/deleteMatricula/:id_alumno_m/:id_curso_m', adminEstudianteController.deleteMatricula)

    }
}

const adminEstudiantenRoutes = new AdminRoutes();
export default adminEstudiantenRoutes.router;