import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class BecaController {
  //obtener las becas disponibles
  public async listarBecasDisponibles(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM beca WHERE cupo !=0 ");
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un error -->", error);
      next()
    }
  }

  // obtener todas las becas
  public async listarBecas(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM beca ");
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un error -->", error);
      next()
    }
  }

  // listar alumnos con becas y el servicio que los cubre 
  public async listOneBeca(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query('SELECT beca.codigo_beca,beca.descripcion,alumno.id_alumno,alumno.nombre_alumno FROM alumno INNER JOIN alumno_beca ON alumno.id_alumno=alumno_beca.id_alumno_ab INNER JOIN beca ON alumno_beca.codigo_beca_ab=beca.codigo_beca ')
      res.json(query)
    } catch (error) {
      console.log('!ERROR ', error)
      next();
    }
  }

  //crear becas
  public async createBeca(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query('INSERT INTO beca SET  ?', [req.body]);
      res.json({ text: 'se creo la beca' })
    } catch (error) {
      console.log('!ERROR ', error)
      next();
    }
  }

  //eliminar becas
  public async deleteBeca(req: Request, res: Response, next: NextFunction) {
    try {
      const { cod_beca } = req.params
      const query = await pool.query('DELETE FROM beca WHERE codigo_beca = ?', [cod_beca])
      res.json({ text: 'se elimino la beca ' })
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

  //actualizar becas 
  public async updateBeca(req: Request, res: Response, next: NextFunction) {
    try {
      const { cod_beca } = req.params
      const query = await pool.query('UPDATE beca set ? WHERE codigo_beca = ?', [req.body, cod_beca])
      res.json(query);
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

  // obtener uno 
  public async getOnebeca(req: Request, res: Response, next: NextFunction) {
    try {
      const { codigo_beca } = req.params
      const query = await pool.query('SELECT * FROM beca WHERE codigo_beca =?', [codigo_beca])
      res.json(query[0])
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

  // asignar beca a alumno con servicio 
  public async createBecaAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno, codigo_beca, id_servicio } = req.body
      //res.json(query1);
      const query1 = await pool.query('INSERT INTO alumno_beca (id_alumno_ab,codigo_beca_ab) VALUES (?, ?)', [id_alumno, codigo_beca])
      const query2 = await pool.query('UPDATE beca SET cupo = cupo-1 WHERE beca.codigo_beca= ? ', [codigo_beca])
      //res.json(query2)
      const query3 = await pool.query('INSERT INTO beca_servicio (codigo_servicio_bs,codigo_beca_bs) VALUES (?,?) ', [id_servicio, codigo_beca])
      res.json(query1)
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

  //eliminar beca del alumno 
  public async deleteBecaAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { codigo_beca, id_alumno } = req.params
      const query1 = await pool.query('DELETE FROM alumno_beca WHERE id_alumno_ab =? ', [id_alumno])
      const query2 = await pool.query('DELETE FROM beca_servicio WHERE codigo_beca_bs = ? ', [codigo_beca])
      res.json(query2)
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

   //eliminar beca del alumno según el identificador de la beca
   public async deleteBecaAlumnosAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params
      const query1 = await pool.query('DELETE FROM alumno_beca WHERE id_alumno_ab =? ', [id_alumno])
      res.json(query1)
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }
  
  //obtener la beca de un alumno 
  public async getBecaAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno } = req.params
      const query = await pool.query('SELECT alumno.id_alumno, alumno.nombre_alumno, beca.descripcion,servicio.id_servicio,servicio.tipo_servicio,beca.codigo_beca FROM alumno INNER JOIN alumno_beca ON alumno.id_alumno=alumno_beca.id_alumno_ab INNER JOIN beca ON alumno_beca.codigo_beca_ab=beca.codigo_beca INNER JOIN beca_servicio ON beca.codigo_beca=beca_servicio.codigo_beca_bs INNER JOIN servicio ON beca_servicio.codigo_servicio_bs=servicio.id_servicio WHERE alumno_beca.id_alumno_ab=? AND alumno_beca.codigo_beca_ab=beca_servicio.codigo_beca_bs LIMIT 1',[id_alumno])
      res.json(query)
    } catch (error) {
      console.log('!ERROR --> ', error);
      next()
    }
  }

}

const becaController = new BecaController();
export default becaController;
