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
  // Listamos las asignaturas segun el grado
public async listAsignaturaGrado(req: Request, res: Response,next:NextFunction) {
  try {
      const {id_grado} = req.params
      const query = await pool.query("SELECT * FROM asignatura WHERE id_grado_a = ? ", [id_grado])
      res.json(query)
  } catch (error) {
      console.log("Ocurrio un error en el contrador del Asignatura al listar las asignaturas por el identificador del grado --> ", error);
      next()
  }
}

  // Listamos las asignaturas con su docente segun el grado
  public async listAsignaturaDocente(req: Request, res: Response,next:NextFunction) {
    try {
        const {id_grado} = req.params
        const query = await pool.query("SELECT docente.nif_docente, docente.nombre_docente,asignatura.id_asignatura, asignatura.nombre_asignatura FROM asignatura INNER JOIN asignatura_docente ON asignatura.id_asignatura = asignatura_docente.id_asignatura_ad INNER JOIN docente ON asignatura_docente.id_docente_ad = docente.nif_docente WHERE asignatura.id_grado_a =  ? ", [id_grado])
        res.json(query)
    } catch (error) {
        console.log("Ocurrio un error en el contrador del Asignatura al listar las asignaturas con su docente  // Listamos las asignaturas segun el grado por el identificador del grado --> ", error);
        next()
    }
  }

  // Creamos una asignatura
  public async createAsignatura(req: Request,res: Response,next: NextFunction) {
    try {
      const query = await pool.query("INSERT INTO asignatura SET ? ", [
        req.body,
      ]);
      res.json({msg: 'Asignatura creada'})
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
        res.json({msg:'Asignatura asignada al Docente'})
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
    // Listamos las asignaturas segun el grado
public async deleteAsignaturaDocente(req: Request, res: Response,next:NextFunction) {
  try {
      const {id_asignatura, id_docente} = req.params
      const query = await pool.query("DELETE FROM asignatura_docente WHERE id_asignatura_ad = ? AND id_docente_ad = ? ", [id_asignatura, id_docente])
      res.json({msg: 'Asignatura eliminada del docente'})
  } catch (error) {
      console.log("Ocurrio un error en el contrador del Asignatura al eliminar una asignatura asignada a un grado --> ", error);
      next()
  }
}
}
const asignaturaController = new AsignaturaController();
export default asignaturaController;
