import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AdminGradoController {
  //listar todos

  public async list(req: Request, res: Response, next:NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM curso ORDER BY nombre_curso ASC");
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

  // Listamos lo grupos uniendo la tabla intermedia entre grupos y cursos
  public async listCursoGrupo(req:Request, res:Response, next:NextFunction){
    try {
      const query = await pool.query("SELECT curso.*, grupo.* FROM grupo INNER JOIN curso_grupo ON grupo.id_grupo = curso_grupo.id_grupo_cg INNER JOIN  curso ON curso_grupo.id_curso_cg = curso.id_curso")
      res.json(query)
    } catch (error) {
      console.log('Ocurrio un erro en el controlador de curso -->', error);
    next()  
    }
  }

  // LISTAMOS LOS GRUPOS SEGUN EL CODIGO DEL CURSO
  
  public async listOnCursoGrupos(req:Request, res:Response, next:NextFunction) {
    try {
      
      const {id_curso} = req.params
      const query = await pool.query("SELECT curso.*, grupo.* FROM grupo INNER JOIN curso_grupo ON grupo.id_grupo = curso_grupo.id_grupo_cg INNER JOIN  curso ON curso_grupo.id_curso_cg = curso.id_curso WHERE curso.id_curso = ? ", [id_curso])

      res.json(query)

    } catch (error) {
      console.log('Ocurrio un error en el contrador de curso al buscar grupos por un curso -->', error);
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

// ASIGNAMOS UN GRUPO A LOS CURSOS
public async createGrupoCurso(req:Request, res:Response, next:NextFunction){
  try {
    console.log('Esta es la isecion de grupos', req.body);
    const query = await pool.query("INSERT INTO curso_grupo SET ? ", [req.body])
    res.json({msg:'Grupo creado'})
    
  } catch (error) {
    console.log('Ocurrio un error en el controlador de curso al insertar un grupoCruso --> ', error);
        next()
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
