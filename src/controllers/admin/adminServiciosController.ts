import { NextFunction } from 'express';
import { Request, Response } from 'express';
import pool from '../../datadase';

class AdminServiciosController {
    // listar
    public async list(req: Request, res: Response) {
        const query = await pool.query('SELECT * FROM servicio');
        res.json(query);
    }

    //crear
    public async createServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query('INSERT INTO servicio set ?', [req.body]);
            res.json({ message: 'Servicio agregado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //eliminar
    public async deleteServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cod_ser } = req.params;
            const query = await pool.query('DELETE FROM servicio WHERE cod_ser = ?', [cod_ser]);
            res.json({text: 'Servicio eliminado con exito'});
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //actualizar 
    public async updateServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cod_ser } = req.params;
            const query = await pool.query('UPDATE servicio SET ? WHERE cod_ser = ?', [req.body, cod_ser]);
            res.json({ message: 'Servicio actualizado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //listar por cod
    public async getOneServicio(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cod_ser } = req.params;
            const query = await pool.query('SELECT * FROM servicio WHERE cod_ser = ? ', [cod_ser]);
            res.json(query)
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const adminServiciosController = new AdminServiciosController;
export default adminServiciosController;