import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase';

class AdminFacturaController {
    //listar todos
    public async list(req: Request, res: Response,) {
        const query = await pool.query('SELECT servicio.tipo_ser,servicio.desc_ser, factura.cod_fac,factura.cod_ser,factura.fec_fac FROM factura INNER JOIN servicio ON factura.cod_ser=servicio.cod_ser');
        res.json(query);
    }

    // crear
    public async createFactura(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query("INSERT INTO factura set ?", [req.body]);
            res.json({ text: 'Se ha crado una nueva factura ' });
        } catch (error) {
            console.log("ERROR ----> ", error)
            next();
        }

    }
    //eliminar
    public async deleteFactura(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cod_fac } = req.params;

            const query = await pool.query('DELETE FROM factura WHERE cod_fac = ?', [cod_fac]);
            res.json({ message: 'Se ha eliminado factura' });
        } catch (error) {
            console.log('ERROR ----> ', error);
            next();
        }
    }
    //Actualizar
    public async updateFactura(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cod_fac } = req.params;
            console.log(req.body);
            const query = await pool.query('UPDATE factura set ? WHERE cod_fac = ?', [req.body, cod_fac]);
            res.json({ text: 'Se ha actualizado la factura'})
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
    public async getOneFactura(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cod_fac } = req.params;
            const query = await pool.query('SELECT * FROM factura WHERE cod_fac = ? ', [cod_fac]);
            res.json(query)
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const adminFacturaController = new AdminFacturaController();
export default adminFacturaController;