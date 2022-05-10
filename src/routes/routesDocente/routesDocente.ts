import { Router } from "express";
import docenteController from '../../controllers/docente/docenteController';

class DocenteRoutes {
    router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {

        // Routes of docente
        this.router.get('/', docenteController.listDocente)
        this.router.get('/categoria', docenteController.listCategoria)
        this.router.get('/:nif_docente', docenteController.listOnDocente)
        this.router.get('/unDocente/:nif_docente', docenteController.listUnDocente)
        this.router.post('/add-docente', docenteController.createDocente)
        this.router.put('/update/:nif_docente', docenteController.updateDocente)
        this.router.delete('/delete/:nif_docente', docenteController.deleteDocente)


        // this.router.put('/updateNote/:id_asi/:id_alu', docenteAsignaturaController.updateNota);
        // this.router.get('/:nif_doc', docenteAsignaturaController.list);
        // this.router.get('/asignatura/:nif_doc', docenteAsignaturaController.listAsignaturaDocente)
        // this.router.get('/programador/:nif_doc', docenteAsignaturaController.listProgramador)
        // this.router.get('/:nif_doc/:id_asi', docenteAsignaturaController.getOneAsignatura);
        // this.router.get('/doc_gra/:nif_doc/:cod_gra', docenteAsignaturaController.listGroup);
    }

}
const docenteRoutes = new DocenteRoutes();
export default docenteRoutes.router;