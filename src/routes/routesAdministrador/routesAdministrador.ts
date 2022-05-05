import { Router } from "express";
import administradorController from "../../controllers/administrador/administradorController";

class AdministradorRoutes {
    router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', administradorController.listarTodos)
        this.router.get('/:documento', administradorController.getOneAdministrador)
        this.router.delete('/delete/:documento', administradorController.deleteAdministrador)
        this.router.put('/update/:documento', administradorController.updateAdministrador)
    }
}

const administradorRoutes = new AdministradorRoutes();
export default administradorRoutes.router