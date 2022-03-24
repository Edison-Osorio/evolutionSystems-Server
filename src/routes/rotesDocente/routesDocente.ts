import { Router } from "express";
import docenteAsignaturaController from "../../controllers/docente/docenteAsignaturaController";

class DocenteRoutes {
    router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {
        this.router.put('/updateNote/:id_asi/:id_alu', docenteAsignaturaController.updateNota);
        this.router.get('/:nif_doc', docenteAsignaturaController.list);
        this.router.get('/:nif_doc/:id_asi', docenteAsignaturaController.getOneAsignatura);
        this.router.get('/doc_gra/:nif_doc/:cod_gra', docenteAsignaturaController.listGroup);
    }

}
const docenteRoutes = new DocenteRoutes();
export default docenteRoutes.router;