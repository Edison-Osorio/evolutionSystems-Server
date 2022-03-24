import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase';

class AdminAsignaturaController {
    //listar todos
    public async list(req: Request, res: Response,) {
        const query = await pool.query('SELECT docente.nom_doc,nom_asi,desc_asi,horario.hora,horario.fec_hor FROM asignatura INNER JOIN horario ON asignatura.cod_hor=horario.cod_hor INNER JOIN docente_asignatura ON asignatura.id_asi=docente_asignatura.id_asi INNER JOIN docente ON docente_asignatura.nif_doc=docente.nif_doc');
        res.json(query);
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