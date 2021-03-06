import {Router} from 'express'
import asignaturaController from '../../controllers/asignatura/asignaturaController';


class AsignaturaRouter{
    router:Router = Router()
    constructor(){
        this.config()
    }
    config(): void{

        // Routes of asignatura
        this.router.get('/', asignaturaController.listAsignatura)
        this.router.get('/asignatura-grado/:id_grado', asignaturaController.listAsignaturaGrado)
        this.router.get('/asignatura-docente/:id_grado', asignaturaController.listAsignaturaDocente)
        this.router.get('/asignatura-docente-grado/:nif_docente/:id_grado', asignaturaController.listAsignaturaDocenteGrado)
        this.router.post('/add-asignatura', asignaturaController.createAsignatura)
        this.router.post('/add-asignatura-docente', asignaturaController.docenteAsignatura)
        this.router.put('/update/:id_asignatura', asignaturaController.updateAsignatura)
        this.router.delete('/delete/:id_asignatura', asignaturaController.deleteAsignatura)
        this.router.delete('/delete-asignatura-docente/:id_asignatura/:id_docente', asignaturaController.deleteAsignaturaDocente)
    }


}
const asignaturaRouter = new AsignaturaRouter()
export default asignaturaRouter.router



