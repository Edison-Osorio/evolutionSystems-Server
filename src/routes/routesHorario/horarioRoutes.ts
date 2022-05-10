import {Router} from 'express'
import horarioController from '../../controllers/horario/horarioController'

class HorarioRoutes{
 router:Router = Router()
 
 constructor(){
     this.config()
 }
 config(){
 this.router.get('/', horarioController.listHorario)
 this.router.get('/on-horario/:id_horario', horarioController.listOneHorario)
 this.router.get('/horario-grado-grupo/:id_grado/:id_grupo', horarioController.listHorarioGradoGrupo)
 this.router.get('/horario-docente-grado-grupo/:nif_docente', horarioController.listHorarioGradoGrupoDocente)
 this.router.get('/horario-alumno/:id_alumno',horarioController.listHorarioAlumno)
 this.router.post('/add-horario', horarioController.createHorario)
 this.router.post('/add-horario-asignatura', horarioController.createAsignaturaHorario)
 this.router.put('/update-horario/:id_horario', horarioController.updateHorario)
 this.router.delete('/delete-horario/:id_horario', horarioController.deleteHorario)
 this.router.delete('/delete-horario-asignatura/:id_horario/:id_asignatura', horarioController.deleteAsignaturaHorario)
 }
}

const horarioRoutes = new HorarioRoutes()
export default horarioRoutes.router