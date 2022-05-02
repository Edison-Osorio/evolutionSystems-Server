import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AdminAlumnoController {
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

const adminAlumnoController = new AdminAlumnoController();
export default adminAlumnoController;
