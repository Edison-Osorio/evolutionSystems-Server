import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class HorarioController {
  // listamos todas los horarios
  public async listHorario(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM horario");
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un error en el controlador de horario al listar los horario");
      next();
    }
  }
  // listamos un horario por su identifiacador
  public async listOneHorario(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_horario } = req.params;
      const query = await pool.query("SELECT * FROM horario WHERE id_horario = ? ", [id_horario]);
      res.json(query[0]);
    } catch (error) {
      console.log("Ocurrio un error en el controlador de horario al listar un horario --> ", error);
      next();
    }
  }
   // listamos los horarios según el grado y el grupo
   public async listHorarioGradoGrupo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_grado, id_grupo } = req.params;
      const query = await pool.query("SELECT asignatura.id_asignatura, asignatura.nombre_asignatura,horario.id_horario , horario.dia, horario.hora FROM horario INNER JOIN asignatura_horario ON horario.id_horario = asignatura_horario.id_horario_ah INNER JOIN asignatura ON asignatura.id_asignatura = asignatura_horario.id_asignatura_ah WHERE asignatura.id_grado_a = ?  AND asignatura_horario.id_grupo_h = ? ", [id_grado, id_grupo]);
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un error en el controlador de horario al listar un horario --> ", error);
      next();
    }
  }
  //  Creamos un horario
  public async createHorario(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("INSERT INTO horario SET ? ", [req.body]);
      res.json({ msg: "Horario Creado" });
    } catch (error) {
      console.log("Ocurrio un error en el controlador de horario al crear un horario");
      next();
    }
  }
  // Asignamos una asignatura a un horario
  public async createAsignaturaHorario(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("INSERT INTO asignatura_horario SET ? ", [req.body]);
      res.json({ msg: "La asignación fue exitosa" });
    } catch (error) {
      console.log("Ocurrio un error en el controlador de horario al crear asignatura_horario --> ", error);
      next();
    }
  }
  // Actualizamos un horario
  public async updateHorario(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_horario } = req.params;
      const query = await pool.query("UPDATE horario SET ? WHERE id_horario = ? ", [
        req.body,
        id_horario,
      ]);
      res.json({ msg: "Horario Actualizado con satisfacción" });
    } catch (error) {
      console.log("Ocurrio un error en el controlador de horario al listar los horario");
      next();
    }
  }
  // Eliminamos un horario
  public async deleteHorario(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_horario } = req.params;
      const query = await pool.query("DELETE FROM horario WHERE id_horario = ? ", [id_horario]);
      res.json({ msg: "Horario eliminado correctamente" });
    } catch (error) {
      console.log("Ocurrio un error en el controlador de horario al eliminar un horario");
      next();
    }
  }
  // Eliminamos una asignación de un horario a una asignatura
  public async deleteAsignaturaHorario(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_horario, id_asignatura } = req.params;
      const query = await pool.query(
        "DELETE FROM asignatura_horario WHERE id_horario_ah = ? AND id_asignatura_ah = ? ",
        [id_horario, id_asignatura]
      );
      res.json({ msg: "Se elimino el horario de esta asignatura" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el controlador de horario al eliminar horario de una asignatura"
      );
      next();
    }
  }
}
const horarioController = new HorarioController();
export default horarioController;
