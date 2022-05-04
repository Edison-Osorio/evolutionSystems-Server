import { Request, Response, NextFunction } from 'express';
import pool from '../../datadase';

class ServiciosController {
    // listar todos los servicios
    public async listarServicios(req: Request, res: Response) {
        const query = await pool.query('SELECT * FROM servicio');
        res.json(query);
    }

    //crear servicios
    public async createServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query('INSERT INTO servicio set ?', [req.body]);
            res.json({ message: 'Servicio agregado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }
    }

    //eliminar servicio
    public async deleteServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cod_ser } = req.params;
            const query = await pool.query('DELETE FROM servicio WHERE id_servicio = ?', [cod_ser]);
            res.json({ text: 'Servicio eliminado con exito' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }
    }

    //actualizar servicio
    public async updateServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cod_ser } = req.params;
            const query = await pool.query('UPDATE servicio SET ? WHERE id_servicio = ?', [req.body, cod_ser]);
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
            const query = await pool.query('SELECT * FROM servicio WHERE id_servicio = ? ', [cod_ser]);
            res.json(query[0])
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }
    }
}

const serviciosController = new ServiciosController;
export default serviciosController;