import { NextFunction, request, Request, Response } from "express";
import pool from "../../datadase";

class AdminBecaController {
  //obtener las becas
  public async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query("SELECT * FROM beca ");
      res.json(query);
    } catch (error) {
      console.log("Ocurrio un error -->", error);
      next()
    }
  }

  // listar alumnos con becas y el servicio que los cubre 
  public async listOne(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query('SELECT beca.cod_beca,beca.des_beca,alumno.id_alu,alumno.nom_alu,servicio.tipo_ser,servicio.desc_ser FROM servicio INNER JOIN beca_servicio ON servicio.cod_ser=beca_servicio.cod_servicio INNER JOIN beca ON beca_servicio.codigo_beca= beca.cod_beca INNER JOIN alumno_beca ON beca.cod_beca=alumno_beca.codigo_beca INNER JOIN alumno ON alumno_beca.id_alumno=alumno.id_alu ');
      res.json(query)
    } catch (error) {
      console.log('!ERROR ', error)
      next();
    }
  }

  //crear becas
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await pool.query('INSERT INTO beca SET  ?', [req.body]);
      res.json({ text: 'se creo la beca' })
    } catch (error) {
      console.log('!ERROR ', error)
      next();
    }
  }

  //eliminar becas
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { cod_beca } = req.params
      const query = await pool.query('DELETE FROM beca WHERE cod_beca = ?', [cod_beca])
      res.json({ text: 'se elimino la beca ' })
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

  //actualizar becas 
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { cod_beca } = req.params
      const query = await pool.query('UPDATE beca set ? WHERE cod_beca = ?', [req.body, cod_beca])
      res.json(query);
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

  // obtener uno 
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { cod_beca } = req.params
      const query = await pool.query('SELECT * FROM beca WHERE cod_beca =?', [cod_beca])
      res.json(query[0])
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

  // asignar beca a alumno con servicio 
  public async createBecaAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { id_alumno, codigo_beca, cod_servicio } = req.body
      //const query2 = await pool.query('INSERT INTO alumno_servicio (id_alumno,cod_servicio) VALUES  (?,?)  ',[id_alumno,cod_servicio])
      //res.json(query1);
      const query1 = await pool.query('INSERT INTO alumno_beca (id_alumno,codigo_beca) VALUES (?, ?)', [id_alumno, codigo_beca])
      //res.json(query2)
      const query3 = await pool.query('INSERT INTO beca_servicio (cod_servicio,codigo_beca) VALUES (?,?) ', [cod_servicio, codigo_beca])
      res.json(query1)
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

  //eliminar beca del alumno 
  public async deleteBecaAlumno(req: Request, res: Response, next: NextFunction) {
    try {
      const { codigo_beca } = req.params
      const query1 = await pool.query('DELETE FROM alumno_beca WHERE codigo_beca = ? ', [codigo_beca])
      const query2 = await pool.query('DELETE FROM beca_servicio WHERE codigo_beca = ? ', [codigo_beca])
      res.json(query2)
    } catch (error) {
      console.log('!ERROR ', error)
      next()
    }
  }

}

const adminbecaController = new AdminBecaController();
export default adminbecaController;
