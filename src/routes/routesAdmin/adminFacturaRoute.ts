import { Router } from "express";
import adminFacturaController from "../../controllers/admin/adminFacturaController"

class AdminFacturaRoutes{
    route:Router = Router();
    constructor(){
        this.config()
    }

    config():void{
        this.route.get('/',adminFacturaController.list);
        this.route.get('/:cod_fac',adminFacturaController.getOneFactura);
        this.route.post('/add', adminFacturaController.createFactura);
        this.route.put('/update/:cod_fac',adminFacturaController.updateFactura);
        this.route.delete('/delete/:cod_fac',adminFacturaController.deleteFactura);
    }
}

const adminFacturaRoutes= new AdminFacturaRoutes();
export default adminFacturaRoutes.route;
