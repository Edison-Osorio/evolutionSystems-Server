import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AsignaturaController {
  //Listamos todas las asignaturas
  public async listAsignatura(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM asignatura");
      res.json(query);
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del Aasignatura al listar las asignaturas --> ",
        error
      );
      next();
    }
  }
  // Creamos una asignatura
  public async createAsignatura(req: Request,res: Response,next: NextFunction) {
    try {
      const query = await pool.query("INSERT INTO asignatura SET ? ", [
        req.body,
      ]);
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador de la asignatura a crear una asignatura --> ",
        error
      );
      next();
    }
  }
   // Asiganamos una asignatura a un docente
  public async docenteAsignatura(req: Request, res: Response,next:NextFunction) {
    try {
        const query = await pool.query("INSERT INTO asignatura_docente SET ? ", [req.body])
    } catch (error) {
      console.log("Ocurrio un error en el contrador del Alumno al actualizar un alumno --> ", error);
      next()
    }
  }
  //Actualizamos las asignaturas
  public async updateAsignatura(req: Request,res: Response,next: NextFunction) {
    try {
      const { id_asignatura } = req.params;
      const query = await pool.query(
        "UPDATE asignatura SET ? WHERE id_asignatura = ? ",
        [req.body, id_asignatura]
      );
      res.json({ msg: "Asignatura Actualizada" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del Asignatura al actualizar una asignatura  --> ",
        error
      );
      next();
    }
  }

  //Eliminamos una asignatura
  public async deleteAsignatura(req: Request,res: Response,next: NextFunction) {
    try {
      const { id_asignatura } = req.params;
      const query = await pool.query(
        "DELETE FROM asignatura WHERE id_asignatura = ? ",
        [id_asignatura]
      );
      res.json({ msg: "Asignatura eliminada" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del Asignatura al eliminar una asignatura --> ",
        error
      );
      next();
    }
  }
}
const asignaturaController = new AsignaturaController();
export default asignaturaController;
