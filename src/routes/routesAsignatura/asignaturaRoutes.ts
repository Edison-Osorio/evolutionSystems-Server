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
        this.router.post('/add-asignatura', asignaturaController.createAsignatura)
        this.router.post('/add-asignatura-docente', asignaturaController.docenteAsignatura)
        this.router.put('/update/:id_asignatura', asignaturaController.updateAsignatura)
        this.router.delete('/delete/:id_asignatura', asignaturaController.deleteAsignatura)
    }


}
const asignaturaRouter = new AsignaturaRouter()
export default asignaturaRouter.router



