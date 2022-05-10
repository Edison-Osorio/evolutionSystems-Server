import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class MatriculaController{

    // Creamos la matricula de un estudiante
public async createMatricula(req: Request, res: Response,next:NextFunction) {
    try {
        const query = await pool.query("INSERT INTO matricula SET ? ", [req.body])
        res.json({msg:'Matricula creada'})
    } catch (error) {
        console.log("Ocurrio un error en el contrador de la matricula al crear las matriculas --> ", error);
        next()
    }
  }
  // Actualizamos una matricula
public async updateMatricula (req: Request, res: Response,next:NextFunction) {
    try {
        const {id_matricula} =req.params
        const query = await pool.query("UPDATE matricula SET ? WHERE id_matricula = ? ", [req.body, id_matricula])
        res.json({msg: 'Matricula Actualizada'})
    } catch (error) {
        console.log("Ocurrio un error en el contrador de la matricula la actualizar una matricula --> ", error);
        next()
    }
  }
  
  // Eliminamos la matricula
public async deleteMatricula(req: Request, res: Response,next:NextFunction) {
    try {
        const {id_alumno} = req.params
        const query = await pool.query("DELETE FROM matricula WHERE id_alumno_m = ? ",[id_alumno])
        res.json({msg: 'Matricula eliminada'})
    } catch (error) {
        console.log("Ocurrio un error en el contrador del Alumno al actualizar un alumno --> ", error);
        next()
    }
  }

}
const matriculaController = new MatriculaController()
export default matriculaController


