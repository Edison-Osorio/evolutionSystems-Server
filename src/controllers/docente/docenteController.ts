import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class DocenteController {
  //Listamos todos los docentes
  public async listDocente(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM docente INNER JOIN categoria ON docente.id_categoria_d = categoria.id_categoria ");
      res.json(query);
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del docente al listar los docentes --> ",
        error
      );
      next();
    }
  }
  //Listamos un docente por su identificador
  public async listOnDocente(req: Request, res: Response, next: NextFunction) {
    try {
      const { nif_docente } = req.params;
      const query = await pool.query(
        "SELECT * FROM docente WHERE nif_docente = ? ",
        [nif_docente]
      );
      res.json(query[0]);
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del docente al lista un docente --> ",
        error
      );
      next();
    }
  }
  //Listamos un docente por su identificador para listarlo
  public async listUnDocente(req: Request, res: Response, next: NextFunction) {
    try {
      const { nif_docente } = req.params;
      const query = await pool.query(
        "SELECT * FROM docente WHERE nif_docente = ? ",
        [nif_docente]
      );
      res.json(query);
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del docente al lista un docente --> ",
        error
      );
      next();
    }
  }
// Listamos las categorias
public async listCategoria(req: Request, res: Response,next:NextFunction) {
  try {
      const query = await pool.query("SELECT * FROM categoria")
      res.json(query)
  } catch (error) {
      console.log("Ocurrio un error en el contrador del Docente al listar las categorias --> ", error);
      next()
  }
}

  // Creamos un docente
public async createDocente(req: Request, res: Response,next:NextFunction) {
  try {
      const query = await pool.query("INSERT INTO docente SET ? ", [req.body])
      res.json({msg:'Docente creado'})
  } catch (error) {
      console.log("Ocurrio un error en el contrador del Docente al crear un docente --> ", error);
      next()
  }
}
  //Actualizamos un docente
  public async updateDocente(req: Request, res: Response, next: NextFunction) {
    try {
      const { nif_docente } = req.params;
      const query = await pool.query(
        "UPDATE docente SET ? WHERE nif_docente = ? ",
        [req.body, nif_docente]
      );
      res.json({ msg: "Docente Actualizado" });
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del Docente al actualizar un docente --> ",
        error
      );
      next();
    }
  }

  //Eliminamos un docente por su identificador
  public async deleteDocente(req: Request, res: Response, next: NextFunction) {
    try {
        const {nif_docente}= req.params
        const query = await pool.query("DELETE FROM docente WHERE nif_docente = ? ", [nif_docente])
        res.json({msg:'Docente Eliminado'})
    } catch (error) {
      console.log(
        "Ocurrio un error en el contrador del Docente al eliminar un docente --> ",
        error
      );
      next();
    }
  }
}

const docenteController = new DocenteController();
export default docenteController;
