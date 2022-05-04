import { Router } from "express";
import becaController from "../../controllers/beca/becaController";


class BecaRoutes{
    router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',becaController.listarBecas)
        this.router.get('/becas-disponibles',becaController.listarBecasDisponibles)
        this.router.get('/:codigo_beca',becaController.getOnebeca)
        this.router.get('/alumno/alumno_beca',becaController.listOneBeca)
        this.router.post('/add',becaController.createBeca)
        this.router.post('/beca_alumno/add',becaController.createBecaAlumno)
        this.router.delete('/delete/:cod_beca',becaController.deleteBeca)
        this.router.delete('/beca_alumno/delete/:codigo_beca/:id_alumno',becaController.deleteBecaAlumno)
        this.router.put('/update/:cod_beca',becaController.updateBeca)
    }
}const becaRoutes = new BecaRoutes();
export default becaRoutes.router;