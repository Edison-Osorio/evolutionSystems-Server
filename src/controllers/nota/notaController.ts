import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class NotaController {
  // asignatura-alumno
  //listar todos
  public async listNotas(req: Request, res: Response, next:NextFunction) {
    const { id_grado, id_grupo } = req.params;
    const query = await pool.query(
      "SELECT alumno.nombre_alumno,  nota.* FROM nota INNER JOIN asignatura ON nota.id_asignatura_n = asignatura.id_asignatura INNER JOIN alumno ON nota.id_alumno_n = alumno.id_alumno INNER JOIN matricula ON alumno.id_alumno = matricula.id_alumno_m INNER JOIN grado ON matricula.id_grado_m = grado.id_grado INNER JOIN grupo ON matricula.id_grupo_m = grupo.id_grupo WHERE grado.id_grado= ? AND grupo.id_grupo = ?",
      [id_grado, id_grupo]
    );
    res.json(query);
  }
  //listar uno
  public async listOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { alu_id } = req.params;
      const query = await pool.query("CALL getOneAlumno(?)", [alu_id]);
      res.json(query);
    } catch (error) {
      console.log("ERROR ----->", error);
      next();
    }
  }
  public async listPeriodo(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM periodo");

      res.json(query);
    } catch (error) {
      console.log("ERROR ----->", error);
      next();
    }
  }
  // crear
  public async createNota(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = await pool.query("INSERT INTO nota set ?", [req.body]);
      res.json({
        text: "Se ha asignado una asignatura al alumno",
        query: query,
        msg: "Notas creadas",
      });
    } catch (error) {
      console.log("ERROR en el controlador de notas la crear una nota----> ", error);
      next();
    }
  }
  //eliminar
  public async deleteNota(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id_alu, id_asi } = req.params;

      const query = await pool.query("DELETE FROM nota WHERE id_alu =?", [id_asi, id_alu]);
      res.json({ message: "Se ha eliminado la asignatura al alumno" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //Actualizar
  public async updateNota(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id_alumno, id_asignatura, id_periodo } = req.params;
      const query = await pool.query(
        "UPDATE nota set ? WHERE id_asignatura_n = ? AND id_alumno_n = ? AND id_periodo_n = ?",
        [req.body, id_asignatura, id_alumno, id_periodo]
      );
      const procedure = await pool.query("call cali(?,?,?)", [id_alumno,id_asignatura, id_periodo]);
      res.json({ text: "Se ha actualizado la asignatura al alumno al alumno" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
}

const notaController = new NotaController();
export default notaController;
