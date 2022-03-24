import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase';

class AdminDocente_AsignaturaController {
    //listar todos
    public async list(req: Request, res: Response,) {
        const query = await pool.query('SELECT docente.nom_doc,docente.nif_doc,docente.dir_doc,docente.fec_nac_doc,docente.tel_doc,docente.dat_ban_doc,docente.area_doc, asignatura.nom_asi,asignatura.desc_asi FROM asignatura INNER JOIN docente_asignatura ON asignatura.id_asi=docente_asignatura.id_asi INNER JOIN docente ON docente_asignatura.nif_doc=docente.nif_doc');
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