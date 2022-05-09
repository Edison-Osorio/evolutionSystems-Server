import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AlumnoSerController {
  //listar todos los alumnos con servicios
  public async listarAlumno_Servicio(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query(
        "SELECT alumno.id_alumno,alumno.nombre_alumno,servicio.tipo_servicio,servicio.descripcion_servicio,servicio.id_servicio FROM alumno INNER JOIN alumno_servicio on alumno.id_alumno=alumno_servicio.id_alumno_as INNER JOIN servicio ON alumno_servicio.codigo_servicio_as=servicio.id_servicio"
      );
      res.json(query);
    } catch (error) {
      console.log('Ocurrio un error', error);
      next()
    }
  }

  //obtener un solo alumno con servicio
  public async getOneAlumno_Servicio(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno, cod_servicio } = req.params
      console.log(id_alumno);
      const query = await pool.query('SELECT * FROM alumno_servicio WHERE id_alumno_as = ? AND codigo_servicio_as = ? ', [id_alumno, cod_servicio]);
      res.json(query[0])
    } catch (error) {
      console.log(error)
      next();
    }
  }

  // asignarle un servicio a un alumno
  public async createAlumno_Servicio(
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

  //eliminarle el servicio al alumno
  public async deleteAlumno_Servicio(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { id_alumno, cod_servicio } = req.params;
      const query = await pool.query(
        "DELETE FROM alumno_servicio WHERE id_alumno_as = ? AND codigo_servicio_as =?",
        [id_alumno, cod_servicio]
      );
      res.json({ message: "Se ha eliminado el servicio del alumno" });
    } catch (error) {
      console.log("ERROR ----> ", error);
      next();
    }
  }

  //Actualizarle el servivio a un alumno
  public async updateAlumno_Servicio(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id_alu, cod_ser } = req.params;
      console.log(req.body);
      const query = await pool.query(
        "UPDATE alumno_servicio set ? WHERE id_alumno = ? AND id_servicio = ?",
        [req.body, id_alu, cod_ser]
      );
      res.json({ text: "Se ha actualizado el servicio al alumno" });
    } catch (error) {
      console.log("ERROR ---->", error);
      next();
    }
  }

  // alumno y servicios
  public async alumnoAndService(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params
      const query = await pool.query('SELECT alumno.id_alumno,alumno.nombre_alumno,servicio.id_servicio,servicio.tipo_servicio,servicio.descripcion_servicio,servicio.valor FROM alumno INNER JOIN alumno_servicio ON alumno.id_alumno=alumno_servicio.id_alumno_as INNER JOIN servicio ON alumno_servicio.codigo_servicio_as=servicio.id_servicio WHERE alumno.id_alumno= ?', [id_alumno])
      res.json(query);
    } catch (error) {
      console.log('!ERROR --> ', error)
      next()
    }
  }

  // servicios fuera del alumno
  public async alumnoOutService(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params
      const query = await pool.query('SELECT * FROM servicio WHERE servicio.id_servicio NOT IN (SELECT alumno_servicio.codigo_servicio_as FROM alumno_servicio WHERE alumno_servicio.id_alumno_as=?)', [id_alumno])
      res.json(query)
    } catch (error) {

      console.log('!ERROR --> ', error);
      next()
    }

  }

}

const alumnoServicioController = new AlumnoSerController();
export default alumnoServicioController;
