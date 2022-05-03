import { Router } from "express";
import adminBecaController from "../../controllers/beca/adminBecaController";

class AdminBecaRoutes{
    router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',adminBecaController.listarBecas)
        this.router.get('/becas-disponibles',adminBecaController.listarBecasDisponibles)
        this.router.get('/:codigo_beca',adminBecaController.getOnebeca)
        this.router.get('/alumno/alumno_beca',adminBecaController.listOneBeca)
        this.router.post('/add',adminBecaController.createBeca)
        this.router.post('/beca_alumno/add',adminBecaController.createBecaAlumno)
        this.router.delete('/delete/:cod_beca',adminBecaController.deleteBeca)
        this.router.delete('/beca_alumno/delete/:codigo_beca/:id_alumno',adminBecaController.deleteBecaAlumno)
        this.router.put('/update/:cod_beca',adminBecaController.updateBeca)
    }
}const adminBecaRoutes = new AdminBecaRoutes();
export default adminBecaRoutes.router;