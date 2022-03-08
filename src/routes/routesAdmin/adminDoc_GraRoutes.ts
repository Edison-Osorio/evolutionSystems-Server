import { Router } from "express";
import adminDocente_GradoController from "../../controllers/admin/adminDoc_GraController";

class AdminDocente_GradoRoutes{
    router: Router = Router();
    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',adminDocente_GradoController.list);
        this.router.post('/add',adminDocente_GradoController.createDocente_Grado);
        this.router.put('/update/:cod_gra/:nif_doc',adminDocente_GradoController.updateDocente_Grado);
        this.router.delete('/delete/:cod_gra/:nif_doc',adminDocente_GradoController.deleteDocente_Grado)
    }
}

const adminDocente_GradoRoutes = new AdminDocente_GradoRoutes();
export default adminDocente_GradoRoutes.router;