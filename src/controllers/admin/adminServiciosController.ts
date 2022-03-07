import { Request, Response } from 'express';
import pool from '../../datadase';

class AdminServiciosController{
    // listar
    public async list(req: Request, res: Response){
        const servicio = await pool.query('SELECT * FROM servicio');
        res.json(servicio);
    }

    //crear
    public async createServicio (req: Request, res: Response): Promise<void>{
        const servicio = await pool.query('INSERT INTO servicio set ?', [req.body]);
        res.json({message: 'Servicio agregado'});
    }

    //eliminar
    public async deleteServicio(req: Request, res:Response): Promise<void>{
        const {cod_ser} = req.params;
        const servicio = await pool.query('DELETE FROM servicio ? WHERE cod_ser = ?', [cod_ser] );
        res.json(servicio);
    }

    //actualizar 
    public async updateServicio(req: Request, res: Response): Promise<void>{
        const {cod_ser} = req.params;
        const servicio = await pool.query('UPDATE servicio SET ? WHERE cod_ser = ?', [req.body, cod_ser]);
        res.json({message: 'Servicio actualizado'});
    }

    //listar por cod
    public async getOneServicio(req: Request, res:Response): Promise<any>{
        const {cod_ser} = req.params;
        const servicio = await pool.query('SELECT * FROM servicio WHERE cod_ser = ? ',[cod_ser]);
        if (servicio.length>0) {
            return res.json(servicio);
        }res.status(404).json({text: 'Servicio no encontrado'})
    }
}

const adminServiciosController = new AdminServiciosController;
export default adminServiciosController;