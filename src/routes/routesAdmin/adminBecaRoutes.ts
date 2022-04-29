import { Router } from "express";
import adminBecaController from "../../controllers/admin/adminBecaController";

class AdminBecaRoutes{
    router:Router=Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',adminBecaController.list)
        this.router.get('/:cod_beca',adminBecaController.getOne)
        this.router.get('/alumno/alumno_beca',adminBecaController.listOne)
        this.router.post('/add',adminBecaController.create)
        this.router.post('/beca_alumno/add',adminBecaController.createBecaAlumno)
        this.router.delete('/delete/:cod_beca',adminBecaController.delete)
        this.router.delete('/beca_alumno/delete/:codigo_beca',adminBecaController.deleteBecaAlumno)
        this.router.put('/update/:cod_beca',adminBecaController.update)
    }
}const adminBecaRoutes = new AdminBecaRoutes();
export default adminBecaRoutes.router;