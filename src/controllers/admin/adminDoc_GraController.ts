import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AdminDocente_GradoController {
  //listar todos
  public async list(req: Request, res: Response) {
    const query = await pool.query(
      "SELECT docente.nom_doc,docente.area_doc, grado.nom_grad,grado.desc_grad FROM docente INNER JOIN docente_grado ON docente.nif_doc=docente_grado.nif_doc INNER JOIN grado ON docente_grado.cod_gra=grado.cod_gra"
    );
    res.json(query);
  }

  public async listOneDocenteGrado(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { nif_doc } = req.params;
      const query = await pool.query(
        "SELECT docente.nom_doc,docente.area_doc, grado.cod_gra, grado.nom_grad,grado.desc_grad FROM docente INNER JOIN docente_grado ON docente.nif_doc=docente_grado.nif_doc INNER JOIN grado ON docente_grado.cod_gra=grado.cod_gra WHERE docente.nif_doc = ? ",
        [nif_doc]
      );
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un error", error);
      next();
    }
  }

  // crear
  public async createDocente_Grado(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = await pool.query("INSERT INTO docente_grado set ?", [
        req.body,
      ]);
      res.json({ text: "Se le ha asignado un nuevo grado al docente" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //eliminar
  public async deleteDocente_Grado(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { cod_gra, nif_doc } = req.params;

      const query = await pool.query(
        "DELETE FROM docente_grado WHERE cod_gra = ? AND nif_doc =?",
        [cod_gra, nif_doc]
      );
      res.json({ message: "Se le ha eliminado el grado al docente" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //Actualizar
  public async updateDocente_Grado(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { cod_gra, nif_doc } = req.params;
      console.log(req.body);
      const query = await pool.query(
        "UPDATE docente_grado set ? WHERE cod_gra = ? AND nif_doc = ?",
        [req.body, cod_gra, nif_doc]
      );
      res.json({ text: "Se ha actualizado el grado al docente" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
}

const adminDocente_GradoController = new AdminDocente_GradoController();
export default adminDocente_GradoController;
