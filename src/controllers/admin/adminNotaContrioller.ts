import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AdminNotaController {
  // asignatura-alumno
  //listar todos
  public async list(req: Request, res: Response) {
    const { id_curso, id_grupo } = req.params;
    const query = await pool.query(
      "SELECT asignatura.id_asi,nota.id_periodo,nota.id_alu,alumno.nom_alu, nota1,nota2,nota3,nota4,nota5,nota_final,asignatura.nom_asi FROM nota INNER JOIN asignatura ON nota.id_asi=asignatura.id_asi INNER JOIN alumno ON nota.id_alu=alumno.id_alu INNER JOIN matricula ON alumno.id_alu=matricula.id_alumno_m INNER JOIN curso ON matricula.id_curso_m = curso.id_curso INNER JOIN grupo ON matricula.id_grupo_m = grupo.id_grupo WHERE curso.id_curso = ? AND grupo.id_grupo = ? ",
      [id_curso, id_grupo]
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

  public async listTrimestres(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM periodo");

      res.json(query);
    } catch (error) {
      console.log("ERROR ----->", error);
      next();
    }
  }

  // crear
  public async createNota(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = await pool.query("INSERT INTO nota set ?", [req.body]);
      res.json({ text: "Se ha asignado una asignatura al alumno", query: query, msg: "Notas creadas"  });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //eliminar
  public async deleteNota(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id_alu, id_asi } = req.params;

      const query = await pool.query(
        "DELETE FROM nota WHERE id_alu =?",
        [id_asi, id_alu]
      );
      res.json({ message: "Se ha eliminado la asignatura al alumno" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //Actualizar
  public async updateNota(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id_alu, id_asi, id_periodo } = req.params;
      console.log(req.body);
      const query = await pool.query(
        "UPDATE nota set ? WHERE id_asi = ? AND id_alu = ? AND id_periodo = ?",
        [req.body, id_asi, id_alu, id_periodo]
      );
      const procedure = await pool.query("call cali(?,?,?)", [
        id_alu,
        id_asi,
        id_periodo,
      ]);
      res.json({ text: "Se ha actualizado la asignatura al alumno al alumno" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
}

const adminNotaController = new AdminNotaController();
export default adminNotaController;

/*select alumno.nom_alu, nota1,nota2,nota3,nota4,nota5,nota_final FROM nota INNER JOIN alumno on nota.id_alu=alumno.id_alu WHERE alumno.id_alu=?; */
