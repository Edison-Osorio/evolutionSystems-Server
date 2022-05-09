import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AlumnoController {
  // Listamos todos los alumnos de la tabla de alumno
  public async listAlumnos(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM alumno");
      res.json(query);
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del adminAlumno en listar --> ",
        error
      );
      next();
    }
  }

  // Listamos un alumno según su identificador
  public async listOneAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params;
      const query = await pool.query(
        "SELECT * FROM alumno WHERE id_alumno = ? ",
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
      console.log(
        "Ocurrio un error en el contrador del Alumno al crear el alumno --> ",
        error
      );
      next();
    }
  }

  // Actualizamos un alumno segun su identificador
  public async updateAlumno(req: Request, res: Response,next:NextFunction) {
    try {
        const {id_alumno} = req.params
        const query = await pool.query("UPDATE alumno SET ? WHERE id_alumno = ? ", [req.body, id_alumno])
        res.json({msg:'Alumno Actualizado'})
    } catch (error) {
        console.log(" Ocurrio un error en el contrador del Alumno al actualizar un alumno--> ", error);
        
    }
}

// Eliminamos el alumno
public async deleteAlumno(req: Request, res: Response,next:NextFunction) {
  try {
        const {id_alumno} = req.params
        const query = await pool.query("")
  } catch (error) {
      console.log("Ocurrio un error en el contrador del Alumno al eliminar un alumno un alumno --> ", error);
      next()
  }
}


}

const alumnoController = new AlumnoController();
export default alumnoController;
