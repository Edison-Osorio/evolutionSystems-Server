import { NextFunction } from 'express';
import { Request, Response } from 'express';
import pool from '../../datadase';

class AdminDocenteController {
    // 1 listar
    public async list(req: Request, res: Response) {
        const query = await pool.query('SELECT * FROM docente');
        res.json(query);
    }

    // 2 crear
    public async createDocente(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query(`INSERT INTO docente set ?`, [req.body]);
            res.json({ message: 'Docente guardado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //3 borrar
    public async deleteDocente(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nif_doc } = req.params;
            const query = await pool.query('DELETE FROM docente WHERE nif_doc = ?', [nif_doc]);
            res.json({ message: 'Docente eliminado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //4 actualizar 
    public async updateDocente(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nif_doc } = req.params;
            const query = await pool.query('UPDATE docente set ? WHERE nif_doc = ?', [req.body, nif_doc]);
            res.json({ message: 'Docente actualizado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //5 listar por nif
    public async getOneDocent(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { nif_doc } = req.params;
            const query = await pool.query('SELECT * FROM docente WHERE nif_doc = ?', [nif_doc]);
            res.json(query);
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const adminDocenteController = new AdminDocenteController();
export default adminDocenteController;
