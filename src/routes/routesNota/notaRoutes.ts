import {Router} from 'express'
import notaController from '../../controllers/nota/notaController';

class NotaRoutes {
    router:Router = Router()

    constructor(){
        this.config()
    }

    config(){
        this.router.get('/list-notas/:id_grado/:id_grupo', notaController.listNotas)
        this.router.get('/notas-alumno/:id_alumno', notaController.listNotasAlumno)
        this.router.get('/periodo', notaController.listPeriodo)
        this.router.post('/add-nota', notaController.createNota)
        this.router.put('/update-nota/:id_alumno/:id_asignatura/:id_periodo', notaController.updateNota)
    }
}

const notaRoutes = new NotaRoutes()
export default notaRoutes.router