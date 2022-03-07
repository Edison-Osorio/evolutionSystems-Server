import { Request, Response } from 'express';
import pool from '../../datadase';

class AdminDocenteController {
    // 1 listar
    public async list(req: Request, res: Response) {
        const docente = await pool.query('SELECT * FROM docente');
        res.json(docente);
    }

    // 2 crear
    public async createDocente(req: Request, res: Response): Promise<void> {
        const docente = await pool.query(`INSERT INTO docente set ?`, [req.body]);
        res.json({ message: 'Docente guardado' });
    }

    //3 borrar
    public async deleteDocente(req: Request, res: Response): Promise<void> {
        const { nif_doc } = req.params;
        const docente = await pool.query('DELETE FROM docente WHERE nif_doc = ?', [nif_doc]);
        res.json({ message: 'Docente eliminado' });
    }

    //4 actualizar 
    public async updateDocente(req: Request, res: Response): Promise<void> {
        const { nif_doc } = req.params;
        const docente = await pool.query('UPDATE docente set ? WHERE nif_doc = ?', [req.body, nif_doc]);
        res.json({ message: 'Docente actualizado' });
    }

    //5 listar por nif
    public async getOneDocente(req: Request, res: Response): Promise<any> {
        const { nif_doc } = req.params;
        const docente = await pool.query('SELECT * FROM docente WHERE nif_doc = ?', [nif_doc]);
        if (docente.length > 0) {
            return res.json(docente);
        } res.status(404).json({ text: 'No se encontro el Docente ' })
        res.json({ text: 'Docente encontrado' });
    }
}

const adminDocenteController = new AdminDocenteController();
export default adminDocenteController;
