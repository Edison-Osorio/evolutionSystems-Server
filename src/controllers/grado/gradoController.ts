import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class GradoController {
  //Listamos todos los grados
  public async listGrado(req: Request, res: Response, next: NextFunction) {
    try {

      const query = await pool.query("SELECT grado.*, ciclo.* FROM grado INNER JOIN ciclo ON grado.id_ciclo_g = ciclo.id_ciclo")
      const query2 = await pool.query("SELECT grado.*, ciclo.* , COUNT(matricula.id_grado_m) as alumnos FROM grado INNER JOIN ciclo ON grado.id_ciclo_g = ciclo.id_ciclo INNER JOIN matricula ON matricula.id_grado_m = grado.id_grado INNER JOIN alumno ON matricula.id_alumno_m = alumno.id_alumno GROUP BY grado.id_grado");
      res.json({query ,query2});
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al listar los grados --> ",
        error
      );
      next();
    }
  }
  // listamos todos los grupos
  public async listGrupo(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM grupo");
      res.json(query);
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al listar los grupo --> ",
        error
      );
      next();
    }
  }
  //Lista todos los grupos de todos los grados 
public async listAllGruposGrados(req: Request, res: Response,next:NextFunction) {
  try {
    const query = await pool.query(
      "SELECT grado.*, grupo.* FROM grado INNER JOIN grado_grupo ON grado.id_grado = grado_grupo.id_grado_grg INNER JOIN grupo ON grado_grupo.id_grupo_grg = grupo.id_grupo")
    res.json(query)
  } catch (error) {
      console.log("Ocurrio un error en el contrador del Grado al listar los grados con los grupos --> ", error);
      next()
  }
}
  // Obtenemos todos los grados con sus grupos
  public async listGradoGrupos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {id_grado}= req.params
      const query = await pool.query(
        "SELECT grado.*, grupo.* FROM grado INNER JOIN grado_grupo ON grado.id_grado = grado_grupo.id_grado_grg INNER JOIN grupo ON grado_grupo.id_grupo_grg = grupo.id_grupo WHERE grado.id_grado = ? ", [id_grado]
      );
      const query2 = await pool.query(
        "SELECT grado.*, grupo.*, COUNT(matricula.id_grupo_m) as alumnos FROM grado INNER JOIN ciclo ON grado.id_ciclo_g = ciclo.id_ciclo INNER JOIN matricula ON matricula.id_grado_m = grado.id_grado INNER JOIN alumno ON matricula.id_alumno_m = alumno.id_alumno INNER JOIN grupo ON matricula.id_grupo_m = grupo.id_grupo WHERE grado.id_grado = ? GROUP BY matricula.id_grupo_m", [id_grado]
      );
      res.json({query, query2});
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al listar los grupos con sus grados --> ",
        error
      );
      next();
    }
  }

  //Listamos todos los ciclos 
  public async listCiclos(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM ciclo");
      res.json(query);
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al listar los ciclos --> ",
        error
      );
      next();
    }
  }

    //Listamos todos los grados segun el docente 
    public async listDocenteGrado(req: Request, res: Response, next: NextFunction) {
      try {
        const {nif_docente} = req.params

        const query = await pool.query("SELECT * FROM docente INNER JOIN asignatura_docente ON docente.nif_docente = asignatura_docente.id_docente_ad INNER JOIN asignatura ON asignatura_docente.id_asignatura_ad = asignatura.id_asignatura INNER JOIN grado ON asignatura.id_grado_a = grado.id_grado INNER JOIN ciclo ON grado.id_ciclo_g = ciclo.id_ciclo WHERE nif_docente = ? GROUP BY id_grado_a",[nif_docente]);
         res.json(query);
      } catch (error) {
        console.log(
          "Ocurrio un error en el contrador del grado al listar los ciclos --> ",
          error
        );
        next();
      }
    }

  // Creamos un grado
  public async createGrado(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("INSERT INTO grado SET ? ", [req.body]);
      res.json({ msg: "Grado creado" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al crear un grado --> ",
        error
      );
      next();
    }
  }

  //Creamos grupos
  public async createGrupo(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("INSERT INTO grupo SET ? ", [req.body]);
      res.json({ msg: "Grupo Creado" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al crear un Grupo --> ",
        error
      );
      next();
    }
  }

  //Le asignamos un grupo a un grupo
  public async createGrupoGrado(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("INSERT INTO grado_grupo SET ? ", [
        req.body,
      ]);
      res.json({ msg: "Grupo asignado" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grupo la asignar un grupo a un grado --> ",
        error
      );
      next();
    }
  }

  // Actualizamos el grado
  public async updateGrado(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_grado } = req.params;
      const query = await pool.query("UPDATE grado SET ?  WHERE id_grado = ?", [
        req.body,
        id_grado,
      ]);
      res.json({ msg: "Grado actializado" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al actualizar un grado --> ",
        error
      );
      next();
    }
  }
  // Eliminamos el grado
  public async deleteGrado(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_grado } = req.params;
      const query = await pool.query("DELETE FROM  grado WHERE id_grado = ? ", [
        id_grado,
      ]);
      res.json({ msg: "Grado eliminado" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al eliminar un grado --> ",
        error
      );
      next();
    }
  }
  // Eliminamos un grupo de un grado
  public async deleteGrupoGrado(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_grado, id_grupo } = req.params;
      const query = await pool.query(
        "DELETE FROM grado_grupo WHERE id_grado_grg = ? AND id_grupo_grg = ? ",
        [id_grado, id_grupo]
      );
      res.json({ msg: "Grupo eliminada del grado" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del grado al actualizar un grupo de un grado --> ",
        error
      );
      next();
    }
  }
}
const gradoController = new GradoController();
export default gradoController;
