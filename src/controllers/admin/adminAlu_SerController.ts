import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AdminAlu_SerController {
  //listar todos
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query(
        "SELECT alumno.id_alu,alumno.nom_alu,servicio.tipo_ser,servicio.desc_ser,servicio.cod_ser FROM alumno INNER JOIN alumno_servicio on alumno.id_alu=alumno_servicio.id_alumno INNER JOIN servicio ON alumno_servicio.cod_servicio=servicio.cod_ser"
      );
      res.json(query);
    } catch (error) {
        console.log('Ocurrio un error',error);
        next()
    }
  }
  //obtener uno solo
  public async getOne(req: Request,res: Response,next: NextFunction) {
    try {
      const {id_alumno,cod_servicio}=req.params
      const query = await pool.query('SELECT * FROM alumno_servicio WHERE id_alumno = ? AND cod_servicio = ? ',[id_alumno,cod_servicio]);
      res.json(query[0])
    } catch (error) {
      console.log(error)
      next();
    }
  }
  // crear
  public async createAlu_Ser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = await pool.query("INSERT INTO alumno_servicio set ?", [
        req.body,
      ]);
      res.json({ text: "Se ha asignado un servicio al alumno" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //eliminar
  public async deleteAlu_Ser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id_alumno, cod_servicio } = req.params;

      const query = await pool.query(
        "DELETE FROM alumno_servicio WHERE id_alumno = ? AND cod_servicio =?",
        [id_alumno, cod_servicio]
      );
      res.json({ message: "Se ha eliminado el servicio del alumno" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }
  //Actualizar
  public async updateAlu_Ser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id_alu, cod_ser } = req.params;
      console.log(req.body);
      const query = await pool.query(
        "UPDATE alumno_servicio set ? WHERE id_alumno = ? AND cod_servicio = ?",
        [req.body, id_alu, cod_ser]
      );
      res.json({ text: "Se ha actualizado el servicio al alumno" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }
}

const adminAlu_SerController = new AdminAlu_SerController();
export default adminAlu_SerController;
