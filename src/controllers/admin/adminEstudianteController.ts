import { Request, Response, NextFunction } from "express";
import pool from "../../datadase";

class AdminEstudianteController {
  //listar
  public async list(req: Request, res: Response) {
    const query = await pool.query(
      "SELECT alumno.*, curso.id_curso, curso.nombre_curso, grupo.id_grupo, grupo.nombre_grupo FROM alumno INNER JOIN matricula ON alumno.id_alu = matricula.id_alumno_m INNER JOIN curso ON matricula.id_curso_m = curso.id_curso INNER JOIN grupo ON matricula.id_grupo_m = grupo.id_grupo"
    );
    res.json(query);
  }

  public async listAlum(req: Request, res: Response, next: NextFunction) {
    try {
      const { cod_gra } = req.params;
      const query = await pool.query(
        "SELECT alumno.id_alu,alumno.nom_alu, alumno.tel_alu, alumno.dire_alu, alumno.tel_alu,alumno.fec_alu, alumno.nom_pa, alumno.nom_ma, alumno.dat_ban_alu  FROM grado INNER JOIN  alumno ON grado.cod_gra=alumno.cod_gra WHERE alumno.cod_gra= ?",
        [cod_gra]
      );
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un erro -->", error);
      next();
    }
  }

  //crear
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = await pool.query("INSERT INTO alumno set ? ", [req.body]);
      res.json({ message: "Alumno guardado" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }

 public async createMatricula(req:Request, res:Response, next:NextFunction){
try {
  const query = await pool.query("INSERT INTO matricula SET ? ", [req.body])
  
} catch (error) {
  console.log('Ocurrio un error al insertar matricula en el controlador Estudiante --> ', error);
  next()
}
  }

  //borrar
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id_alu } = req.params;
      const query = await pool.query("DELETE FROM alumno WHERE id_alu = ? ", [
        id_alu,
      ]);
      //DElETE FROM alumno WHERE id_alu = ?
      res.json({ message: "alumno eliminado" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }

  // ELIMINAMOS LA MATRICULA DEL ALUMNO
  public async deleteMatricula(req:Request, res:Response, next:NextFunction){
    try {

      const {id_alumno_m, id_curso_m} = req.params

      const query = await pool.query("DELETE FROM matricula WHERE id_alumno_m = ? AND id_curso_m = ? ", [id_alumno_m,id_curso_m])
      res.json({message: 'Matricula eliminada'})
    } catch (error) {
      console.log('Ocurrio un error en el controlador de estudiante al eliminar matricula --> ', error);
      
    }
  }

  //actualizar
  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id_alu } = req.params;
      const query = await pool.query("UPDATE alumno set ? WHERE id_alu = ?", [
        req.body,
        id_alu,
      ]);

      res.json({ message: "Alumno modificado" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }

  //listar solo por id
  public async getOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    // para poder retornar , <void> no retorna
    try {
      const { id_alu } = req.params;
      const query = await pool.query("SELECT * FROM alumno WHERE id_alu =? ", [
        id_alu,
      ]);
      res.json(query[0]);
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
}

const adminEstudianteController = new AdminEstudianteController();
export default adminEstudianteController;
