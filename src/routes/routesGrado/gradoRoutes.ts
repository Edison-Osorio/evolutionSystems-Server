import {Router} from 'express'
import gradoController from "../../controllers/grado/gradoController";

class GradoRouter {
  router: Router = Router(); 

  constructor() {
    this.config();
  }

  config() :void {
      this.router.get('/grado', gradoController.listGrado)
      this.router.get('/grupo', gradoController.listGrupo)
      this.router.get('/grado-grupo', gradoController.listAllGruposGrados)
      this.router.get('/grado-grupo/:id_grado', gradoController.listGradoGrupos)
      this.router.post('/add-grado', gradoController.createGrado)
      this.router.post('/add-grupo', gradoController.createGrupo)
      this.router.post('/add-grupo-grado', gradoController.createGrupoGrado)
      this.router.put('/update-grado/:id_grado', gradoController.updateGrado)
      this.router.delete('/delete-grado/:id_grado', gradoController.deleteGrado)
      this.router.delete('/delete-grupo-grado/:id_grado/:id_grupo', gradoController.deleteGrupoGrado)
  }
}
const gradoRouter = new GradoRouter()
export default gradoRouter.router
