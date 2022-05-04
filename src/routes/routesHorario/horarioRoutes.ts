import {Router} from 'express'
import horarioController from '../../controllers/horario/horarioController'

class HorarioRoutes{
 router:Router = Router()
 
 constructor(){
     this.config()
 }
 config(){

 }
}

const horarioRoutes = new HorarioRoutes()
export default horarioRoutes.router