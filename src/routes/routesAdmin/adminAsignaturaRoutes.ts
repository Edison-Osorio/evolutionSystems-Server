import { Router } from "express";
import adminAsignaturaController from "../../controllers/admin/adminAsignaturaController";

class AdminAsignaturaRoutes {
    router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', adminAsignaturaController.list);
        this.router.get('/asignatura/:id_curso', adminAsignaturaController.listAsignatura)
        this.router.get('/asignatura-curso/:id_curso', adminAsignaturaController.listAsignaturasCurso)
        this.router.get('/:id_asi', adminAsignaturaController.getOneAsignatura);
        this.router.post('/add', adminAsignaturaController.createAsignatura);
        this.router.put('/update/:id_asi', adminAsignaturaController.updateAsignatura);
        this.router.delete('/delete/:id_asi', adminAsignaturaController.deleteAsignatura);
    }
}
const adminAsignaturaRoutes = new AdminAsignaturaRoutes();
export default adminAsignaturaRoutes.router;