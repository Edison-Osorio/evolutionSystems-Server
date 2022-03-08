import { Router } from "express";
import adminDocente_AsignaturaController from "../../controllers/admin/adminDoc_AsiController";

class AdminDoc_AsiRoutes{
    routes: Router=Router();
    constructor(){
        this.config();
    }

    config(): void{
        this.routes.get('/',adminDocente_AsignaturaController.list);
        this.routes.post('/add',adminDocente_AsignaturaController.createDocente_Asignatura);
        this.routes.put('/update/:nif/:id_asi', adminDocente_AsignaturaController.updateDocente_Asignatura);
        this.routes.delete('/delete/:nif_doc/:id_asi',adminDocente_AsignaturaController.deleteDocente_Asignatura);
    }
}
const adminDoc_AsiRoutes = new AdminDoc_AsiRoutes();
export default adminDoc_AsiRoutes.routes;