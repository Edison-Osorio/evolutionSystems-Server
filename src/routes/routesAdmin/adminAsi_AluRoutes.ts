import { Router } from "express";
import adminAsi_AluController from "../../controllers/admin/adminAsi_AluController";

class AdminAsi_AluRoutes {
    routes: Router = Router();
    constructor(){
        this.config();
    }

    config(): void{
        this.routes.get('/',adminAsi_AluController.list);
        this.routes.post('/add',adminAsi_AluController.createAsi_Alu);
        this.routes.put('/update/:id_alu/:id_asi', adminAsi_AluController.updateAsi_Alu);
        this.routes.delete('/delete/:id_alu/:id_asi', adminAsi_AluController.deleteAsi_Alu);
    }
}

const adminAsi_AluRoutes = new AdminAsi_AluRoutes();
export default adminAsi_AluRoutes.routes;