import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase';

class AdminGradoController {
    //listar todos
    public async list(req: Request, res: Response,) {
        const query = await pool.query('SELECT * FROM grado');
        res.json(query);
    }
    // crear
    public async createGrado(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query("INSERT INTO grado set ?", [req.body]);
            res.json({ text: 'Se ha crado un nuevo grado' });
        } catch (error) {
            console.log("ERROR ----> ", error)
            next();
        }

    }
    //eliminar
    public async deleteGrado(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cod_gra } = req.params;

            const query = await pool.query('DELETE FROM grado WHERE cod_gra = ?', [cod_gra]);
            res.json({ message: 'Se ha eliminado el grado' })

        } catch (error) {
            console.log('ERROR ----> ', error);
            next();
        }
    }
    //Actualizar
    public async updateGrado(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cod_gra } = req.params;
            console.log(req.body);
            const query = await pool.query('UPDATE grado set ? WHERE cod_gra = ?', [req.body, cod_gra]);
            res.json({ text: 'Se ha actualizado el servicio al alumno' })
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
    public async getOneGrado(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { cod_gra } = req.params;
            const query = await pool.query('SELECT * FROM grado WHERE cod_gra = ? ', [cod_gra]);
            res.json(query)
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }
}

const adminGradoController = new AdminGradoController();
export default adminGradoController;