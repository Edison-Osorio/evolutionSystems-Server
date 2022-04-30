import { Router } from "express";
import adminNotaController from "../../controllers/admin/adminNotaContrioller";


class AdminNotaRoutes {
  routes: Router = Router();
  constructor() {
    this.config();
  }

  config(): void {
    this.routes.get("/trimestres/", adminNotaController.listTrimestres);
    this.routes.get("/:id_curso/:id_grupo", adminNotaController.list);
    this.routes.post("/add", adminNotaController.createNota);
    this.routes.put("/update/:id_asi/:id_alu/:id_periodo", adminNotaController.updateNota);
    this.routes.delete(
      "/delete/:id_alu",
      adminNotaController.deleteNota
    );
    this.routes.get("/:alu_id", adminNotaController.listOne);
  }
}

const adminNotaRoutes = new AdminNotaRoutes();
export default adminNotaRoutes.routes;
