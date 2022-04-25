import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AdminGradoController {
  //listar todos

  public async list(req: Request, res: Response, next:NextFunction) {
    try {
      const query = await pool.query("SELECT curso.*, grupo.nombre_grupo FROM grupo INNER JOIN curso  on curso.id_grupo = grupo.id_grupo INNER JOIN ciclo on curso.id_ciclo = ciclo.id_ciclo order by curso.nombre_curso ASC");
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un error -->", error);
      next()
    }
  }


  public async listCiclo(req:Request, res:Response, next:NextFunction) {
    try {

      const query = await pool.query('SELECT * FROM ciclo')

      res.json(query)
      
    } catch (error) {
     console.log('Ocuriro un erro listando los ciclos', error);
     next()
    }
    
  }

  public async listGrupo(req:Request, res:Response, next:NextFunction){
  try {
    const query = await pool.query('SELECT * FROM grupo')
    res.json(query)
  } catch (error) {
    console.log('Ocurrio un error listando los grupos', error);
    next()
    
  }
  }

  // crear
  public async createCurso(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = await pool.query("INSERT INTO curso set ?", [req.body]);
      res.json({ text: "Se ha crado un nuevo curso" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //eliminar

  public async deleteCurso(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { cod_gra } = req.params;

      const query = await pool.query("DELETE FROM curso WHERE id_curso = ?", [
        cod_gra,
      ]);
      res.json({ message: "Se ha eliminado el grado" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //Actualizar
  public async updateCurso(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { cod_gra } = req.params;
      console.log(req.body);
      const query = await pool.query("UPDATE grado set ? WHERE cod_gra = ?", [
        req.body,
        cod_gra,
      ]);
      res.json({ text: "Se ha actualizado el servicio al alumno" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
  public async getOneCurso(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { cod_gra } = req.params;
      const query = await pool.query("SELECT * FROM grado WHERE cod_gra = ? ", [
        cod_gra,
      ]);
      res.json(query[0]);
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
}

const adminGradoController = new AdminGradoController();
export default adminGradoController;
