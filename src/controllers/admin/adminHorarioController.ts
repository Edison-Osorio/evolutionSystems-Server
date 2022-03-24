import { Request, Response, NextFunction } from 'express';
import pool from '../../datadase';

class AdminHorarioController {
    //listar todos
    public async list(req: Request, res: Response,) {
        const query = await pool.query('SELECT * FROM horario');
        res.json(query);
    }
    // crear
    public async createHorario(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query("INSERT INTO horario set ? ", [req.body]);
            res.json({ text: 'Se ha crado un nuevo horario ' });
        } catch (error) {
            console.log("ERROR ----> ", error)
            next();
        }

    }
    //eliminar
    public async deleteHorario(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cod_hor } = req.params;

            const query = await pool.query('DELETE FROM horario WHERE cod_hor = ?', [cod_hor]);
            res.json({ message: 'Se ha eliminado el horario' });
        } catch (error) {
            console.log('ERROR ----> ', error);
            next();
        }
    }
    //Actualizar
    public async updateHorario(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cod_hor } = req.params;
            console.log(req.body);
            const query = await pool.query('UPDATE horario set ? WHERE cod_hor = ?', [req.body, cod_hor]);
            res.json({ text: 'Se ha actualizado horario' })
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
    public async getOneHorario(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cod_hor } = req.params;
            const query = await pool.query('SELECT * FROM horario WHERE cod_hor = ? ', [cod_hor]);
            res.json(query)
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const adminHorarioController = new AdminHorarioController();
export default adminHorarioController;