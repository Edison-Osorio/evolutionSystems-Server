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
        "Ocurrio un error en el contrador del Alumno en listar --> ",
        error
      );
      next();
    }
  }
  //Listamos un alumno según de su identifador
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
        " Ocurrio un error en el contrador del Alumno al listar un solo alumno --> ",
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
  // Actualizamos un alumno según su indentificador
  public async updateAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params;
      const query = await pool.query("UPDATE alumno set ? WHERE id_alu = ?", [
        req.body,
        id_alumno,
      ]);
      res.json({msg: 'Alumno Actualizo'})
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del Alumno al actualizar un alumno --> ",
        error
      );
      next();
    }
  }
// 
public async deleteAlumno(req: Request, res: Response,next:NextFunction) {
  try {
      const {id_alumno} = req.params
      const query = await pool.query("DELETE FROM alumno WHERE id_alumno = ? ", [id_alumno])
  } catch (error) {
      console.log("Ocurrio un error en el contrador del Alumno al eliminar un alumno --> ", error);
      next()
  }
}
  
}

const alumnoController = new AlumnoController();
export default alumnoController;
