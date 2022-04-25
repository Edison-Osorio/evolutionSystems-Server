import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase';

class AdminAsignaturaController {
    //listar todos
    public async list(req: Request, res: Response,next:NextFunction) {
        try {
            
            const query = await pool.query('SELECT * FROM asignatura ');
            res.json(query);
        } catch (error) {
           console.log('Ocurrio un error --> ', error);
            next()
        }
    }

    // Obtenemos la asignaturas segun el grado 
    public async listAsignatura(
        req: Request,
        res: Response,
        next: NextFunction
      ) {
        try {
          const { id_curso } = req.params;

          const query = await pool.query(
          "SELECT asignatura.id_asi, asignatura.nom_asi FROM asignatura INNER JOIN asignatura_alumno ON asignatura.id_asi = asignatura_alumno.id_asi INNER JOIN alumno ON asignatura_alumno.id_alu = alumno.id_alu WHERE alumno.id_curso = ?",
            [id_curso]
          );

          console.log('Se hizo esta consulta');
          
    
          res.json(query);
        } catch (error) {
          console.log("ERROR -->", error);
          next();
        }
      }

     // Listamos todas las asignaturas segun un identificador de un curso
      public async listAsignaturasCurso(req: Request, res: Response, next: NextFunction) {
          try {
              const {id_curso} = req.params
              console.log(id_curso);
              

             const query = await pool.query("SELECT asignatura.id_asi, asignatura.nom_asi FROM curso INNER JOIN curso_asignatura on curso.id_curso = curso_asignatura.id_curso_cs INNER JOIN asignatura ON curso_asignatura.id_asignatura_cs = asignatura.id_asi WHERE curso.id_curso = ?", [id_curso])

             res.json(query)
          } catch (error) {
              console.log('Ocurrio un error -->', error);
              next()
              
              
          }
      }

    // crear
    public async createAsignatura(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query("INSERT INTO asignatura set ?", [req.body]);
            res.json({ text: 'Se ha crado una nueva asignatura ' });
        } catch (error) {
            console.log("ERROR ----> ", error)
            next();
        }

    }
    //eliminar
    public async deleteAsignatura(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id_asi } = req.params;

            const query = await pool.query('DELETE FROM asignatura WHERE id_asi = ?', [id_asi]);
            res.json({ message: 'Se ha eliminado la asignatura' });
        } catch (error) {
            console.log('ERROR ----> ', error);
            next();
        }
    }
    //Actualizar
    public async updateAsignatura(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_asi } = req.params;
            console.log(req.body);
            const query = await pool.query('UPDATE asignatura set ? WHERE id_asi = ?', [req.body, id_asi]);
            res.json({ text: 'Se ha actualizado la asignatura' })
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
    public async getOneAsignatura(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id_asi } = req.params;
            const query = await pool.query('SELECT nom_asi,desc_asi,horario.hora,horario.fec_hor FROM asignatura INNER JOIN horario ON asignatura.cod_hor=horario.cod_hor WHERE asignatura.id_asi= ? ', [id_asi]);
            res.json(query)
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const adminaAsignaturaController = new AdminAsignaturaController();
export default adminaAsignaturaController;