import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase'

class DocenteNotaController {

    public async list(req: Request, res: Response,) {
        const query = await pool.query('SELECT alumno.nom_alu, nota1,nota2,nota3,nota4,nota5,nota_final FROM nota INNER JOIN alumno ON nota.id_alu=alumno.id_alu');
        res.json(query);
    }
    // crear
    public async createNota(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query("INSERT INTO nota set ?", [req.body]);
            res.json({ text: 'Se ha asignado una asignatura al alumno' });
        } catch (error) {
            console.log("ERROR ----> ", error)
            next();
        }

    }
    //eliminar
    public async deleteNota(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id_alu, id_asi } = req.params;

            const query = await pool.query('DELETE FROM nota WHERE id_asi = ? AND id_alu =?', [id_asi, id_alu]);
            res.json({ message: 'Se ha eliminado la asignatura al alumno' });
        } catch (error) {
            console.log('ERROR ----> ', error);
            next();
        }
    }
    //Actualizar
    public async updateNota(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_alu, id_asi } = req.params;
            console.log(req.body);
            const query = await pool.query('UPDATE nota set ? WHERE id_asi = ? AND id_alu = ?', [req.body, id_asi, id_alu]);
            const procedure = await pool.query('call cali(?)', [id_alu]);
            res.json({ text: 'Se ha actualizado la asignatura al alumno al alumno' })
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const docenteNotaController = new DocenteNotaController();
export default docenteNotaController;