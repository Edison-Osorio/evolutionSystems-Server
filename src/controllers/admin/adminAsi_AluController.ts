import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase';

class AdminAsi_AluController { // asignatura-alumno
    //listar todos
    public async list(req: Request, res: Response,) {
        const query = await pool.query('SELECT * FROM asignatura_alumno');
        res.json(query);
    }
    // crear
    public async createAsi_Alu(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query("INSERT INTO asignatura_alumno set ?", [req.body]);
            res.json({ text: 'Se ha asignado una asignatura al alumno' });
        } catch (error) {
            console.log("ERROR ----> ", error)
            next();
        }

    }
    //eliminar
    public async deleteAsi_Alu(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id_alu, id_asi } = req.params;

            const query = await pool.query('DELETE FROM asignatura_alumno WHERE id_alu = ? AND id_asi =?', [id_alu, id_asi]);
            res.json({ message: 'Se ha eliminado la asignatura al alumno' });
        } catch (error) {
            console.log('ERROR ----> ', error);
            next();
        }
    }
    //Actualizar
    public async updateAsi_Alu(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_alu, id_asi } = req.params;
            console.log(req.body);
            const query = await pool.query('UPDATE asignatura_alumno set ? WHERE id_alu = ? AND id_asi = ?', [req.body, id_alu, id_asi]);
            res.json({ text: 'Se ha actualizado la asignatura al alumno al alumno' })
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const adminAsi_AluController = new AdminAsi_AluController();
export default adminAsi_AluController;