import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AlumnoController {
  // Listamos todos los alumnos de la tabla de alumno
  public async listAlumnos(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM alumno");
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un error en el contrador del adminAlumno en listar --> ", error);
      next();
    }
  }

  // Listamos un alumno según su identificador
  public async listOneAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params;
      const query = await pool.query("SELECT * FROM alumno WHERE id_alumno = ? ", [id_alumno]);
      res.json(query[0]);
    } catch (error) {
      console.log(
        " Ocurrio un error en el contrador del adminAlumno al listar un solo alumno --> ",
        error
      );
    }
  }

  // listamos el grado de un alumno según su identificador
  public async listGradoAlumno(req:Request, res:Response, next:NextFunction){
    try {
      const {id_alumno} = req.params
      const query = await pool.query("SELECT asignatura.nombre_asignatura,grado.nombre_grado, grupo.nombre_grupo, alumno.nombre_alumno, nota.* FROM matricula  INNER JOIN grado ON matricula.id_grado_m = grado.id_grado INNER JOIN asignatura ON asignatura.id_grado_a = grado.id_grado INNER JOIN nota ON nota.id_asignatura_n = asignatura.id_asignatura INNER JOIN grupo ON grupo.id_grupo = matricula.id_grupo_m INNER JOIN alumno ON alumno.id_alumno = matricula.id_alumno_m WHERE matricula.id_alumno_m  = ?",[id_alumno])

      res.json(query[0])
    } catch (error) {
      console.log('Ocurrio un error el el controlador de Alumno en la consulta de un grado de un alumno --> ', error);
      next()
    }
  }

  // Listamos un alumno según su identificador para listalos
  public async listarUnAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params;
      const query = await pool.query("SELECT * FROM alumno WHERE id_alumno = ? ", [id_alumno]);
      res.json(query);
    } catch (error) {
      console.log(
        " Ocurrio un error en el contrador del adminAlumno al listar un solo alumno --> ",
        error
      );
    }
  }
  //Listamos los alumnos segun el grado y el grupo
  public async listAlumnoGradoGrupo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_grado, id_grupo } = req.params;
      const query = await pool.query(
        "SELECT alumno.* FROM alumno INNER JOIN matricula ON alumno.id_alumno = matricula.id_alumno_m WHERE matricula.id_grado_m = ? AND matricula.id_grupo_m = ?  ",
        [id_grado, id_grupo]
      );
      res.json(query);
    } catch (error) {
      console.log(
        "Ocurrio un error en el controlador de Alumno al listar los alumnos según el grado y el grupo"
      );
    }
  }
  // Listamos un alumno según su identificador con su grado
  public async listOneAlumnoWhitGrado(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params;
      const query = await pool.query(
        "SELECT alumno.nombre_alumno,alumno.id_alumno, alumno.fecha_nacimiento,grupo.nombre_grupo,grado.nombre_grado FROM alumno INNER JOIN matricula ON alumno.id_alumno=matricula.id_alumno_m INNER JOIN grado ON matricula.id_grado_m=grado.id_grado INNER JOIN grado_grupo ON grado.id_grado=grado_grupo.id_grado_grg INNER JOIN grupo ON grado_grupo.id_grupo_grg=grupo.id_grupo WHERE grupo.id_grupo=matricula.id_grupo_m AND alumno.id_alumno=? ",
        [id_alumno]
      );
      res.json(query[0]);
    } catch (error) {
      console.log(
        " Ocurrio un error en el contrador del adminAlumno al listar un solo alumno --> ",
        error
      );
    }
  }
  //   Creamos un alumno en la tabla alumno
  public async createAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("INSERT INTO alumno SET ? ", [req.body]);
      res.json({ msg: "Alumno creado" });
    } catch (error) {
      console.log("Ocurrio un error en el contrador del Alumno al crear el alumno --> ", error);
      next();
    }
  }

  // Actualizamos un alumno segun su identificador
  public async updateAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params;
      const query = await pool.query("UPDATE alumno SET ? WHERE id_alumno = ? ", [
        req.body,
        id_alumno,
      ]);
      res.json({ msg: "Alumno Actualizado" });
    } catch (error) {
      console.log(
        " Ocurrio un error en el contrador del Alumno al actualizar un alumno--> ",
        error
      );
    }
  }

  // Eliminamos el alumno
  public async deleteAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params;
      const query = await pool.query("DELETE FROM alumno WHERE id_alumno = ? ",[id_alumno]);
      res.json({msg:'Alumno Eliminado!'})
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del Alumno al eliminar un alumno un alumno --> ",
        error
      );
      next();
    }
  }
}

const alumnoController = new AlumnoController();
export default alumnoController;
