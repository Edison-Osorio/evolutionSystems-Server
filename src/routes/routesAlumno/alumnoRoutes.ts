import { Router } from "express";
//import alumnoController from "../../controllers/alumnoControlleralumno/AlumnoController";
import alumnoController from "../../controllers/alumno/alumnoController";
import matriculaController from '../../controllers/matricula/matriculaController';


class AlumnoRouter {
    router: Router = Router();
    constructor() {
        this.config()
    }

    config(): void {

        // Routes of alumnos
        this.router.get('/', alumnoController.listAlumnos)
        this.router.get('/onAlumno/:id_alumno', alumnoController.listOneAlumno)
        this.router.get('/alumnos-grado-grupo/:id_grado/:id_grupo', alumnoController.listAlumnoGradoGrupo)
        this.router.get('/onAlumno/grado/:id_alumno', alumnoController.listOneAlumnoWhitGrado)
        this.router.post('/add-alumno', alumnoController.createAlumno)
        this.router.put('/update-alumno/:id_alumno', alumnoController.updateAlumno)
        this.router.delete('/delete-alumno/:id_alumno', alumnoController.deleteAlumno)

        // Routes of Matricula
        this.router.post('/add-matricula', matriculaController.createMatricula)
        this.router.put('/update-matricula', matriculaController.updateMatricula)
        this.router.delete('/delete-matricula', matriculaController.deleteMatricula)

        // this.router.get('/notas/:id_alu', alumnoController.listNotas);
        // this.router.get('/horario/:id_alu', alumnoController.listHorario);
        // this.router.get('/servicios/:id_alu', alumnoController.listServicios);
    }
}

const alumnoRouter = new AlumnoRouter();
export default alumnoRouter.router;