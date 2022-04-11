import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class DocenteAsignaturaController {
  //listar todas las asignatura
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { nif_doc } = req.params;
      const query = await pool.query(
        "SELECT docente.nom_doc,nom_asi,desc_asi FROM asignatura INNER JOIN nota ON asignatura.id_asi=nota.id_asi INNER JOIN docente_asignatura ON asignatura.id_asi=docente_asignatura.id_asi INNER JOIN docente ON docente_asignatura.nif_doc=docente.nif_doc  WHERE docente_asignatura.nif_doc= ?",
        [nif_doc]
      );
      res.json(query);
    } catch (error) {
      console.log("ERROR -->", error);
      next();
    }
  }

  public async listProgramador(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nif_doc } = req.params;

      const query = await pool.query(
        "SELECT horario.fec_hor, horario.hora, asignatura.nom_asi, grado.nom_grad, grado.desc_grad FROM horario INNER JOIN asignatura ON horario.cod_hor = asignatura.cod_hor INNER JOIN docente_asignatura ON asignatura.id_asi = docente_asignatura.id_asi INNER JOIN docente ON docente_asignatura.nif_doc = docente.nif_doc INNER JOIN docente_grado ON docente.nif_doc = docente_grado.nif_doc INNER JOIN grado ON docente_grado.cod_gra = grado.cod_gra WHERE docente.nif_doc = ?",
        [nif_doc]
      );

      res.json(query);
    } catch (error) {
      console.log("ERROR -->", error);
      next();
    }
  }

  //listar los grupos
  public async listGroup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { nif_doc, cod_gra } = req.params;
      const query = await pool.query(
        "SELECT grado.cod_gra,grado.nom_grad,grado.carac_grad FROM grado INNER JOIN docente_grado ON grado.cod_gra=docente_grado.cod_gra WHERE docente_grado.nif_doc= ? AND docente_grado.cod_gra= ?",
        [nif_doc, cod_gra]
      );
      res.json({ text: query });
      console.log(query);
      console.log(req.params);
    } catch (error) {
      console.log("error", error);
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
      const { id_alu, id_asi } = req.params;
      console.log(req.body);
      const query = await pool.query(
        "UPDATE nota set ? WHERE id_asi = ? AND id_alu = ?",
        [req.body, id_asi, id_alu]
      );
      const procedure = await pool.query("call cali(?,?)", [id_asi, id_alu]);
      res.json({ text: "Se ha actualizado la asignatura al alumno al alumno" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
  public async getOneAsignatura(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id_asi } = req.params;
      const query = await pool.query(
        "SELECT * FROM asignatura WHERE id_asi = ? ",
        [id_asi]
      );
      res.json(query);
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
}

const docenteAsignaturaController = new DocenteAsignaturaController();
export default docenteAsignaturaController;
