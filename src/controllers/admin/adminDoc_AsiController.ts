import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase';

class AdminDocente_AsignaturaController {
    //listar todos
    public async list(req: Request, res: Response,) {
        const query = await pool.query('SELECT * FROM docente_asignatura');
        res.json(query);
    }
    // crear
    public async createDocente_Asignatura(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query("INSERT INTO docente_asignatura set ?", [req.body]);
            res.json({ text: 'Se le ha asignado una asignatura al docente' });
        } catch (error) {
            console.log("ERROR ----> ", error)
            next();
        }

    }
    //eliminar
    public async deleteDocente_Asignatura(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { nif_doc, id_asi } = req.params;

            const query = await pool.query('DELETE FROM docente_asignatura WHERE nif_doc = ? AND id_asi =?', [nif_doc, id_asi]);
            res.json({ message: 'Se le ha eliminado el grado al docente' })

        } catch (error) {
            console.log('ERROR ----> ', error);
            next();
        }
    }
    //Actualizar
    public async updateDocente_Asignatura(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nif_doc, id_asi } = req.params;
            console.log(req.body);
            const query = await pool.query('UPDATE docente_asignatura set ? WHERE nif_doc = ? AND id_asi = ?', [req.body, nif_doc, id_asi]);
            res.json({ text: 'Se ha actualizado la asignatura al docente' })
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const adminDocente_AsignaturaController = new AdminDocente_AsignaturaController();
export default adminDocente_AsignaturaController;