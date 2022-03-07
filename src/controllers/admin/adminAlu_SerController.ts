import { NextFunction, Request, Response } from 'express';
import pool from '../../datadase';

class AdminAlu_SerController {
    //listar todos
    public async list(req: Request, res: Response,) {
        const alu_ser = await pool.query('SELECT * FROM alumno_servicio');
        res.json(alu_ser);
    }
    // crear
    public async createAlu_Ser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const query = await pool.query("INSERT INTO alumno_servicio set ?", [req.body]);
            res.json({ text: 'Se ha asignado un servicio al alumno' });
        } catch (error) {
            console.log("El error es ", error)
            next();
        }

    }
    //eliminar
    public async deleteAlu_Ser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const { id_alu, cod_ser } = req.params;

            const query = await pool.query('DELETE FROM alumno_servicio WHERE id_alu = ? AND cod_ser =?', [id_alu, cod_ser]);
            res.json({ message: 'Se ha eliminado el servicio del alumno' })

        } catch (error) {
            console.log('No se pudo eliminar el servicio del alumno ', error);
            next();
        }
    }
    //Actualizar
    public async updateAlu_Ser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_alu, cod_ser } = req.params;
            console.log(req.body);
            const query = await pool.query('UPDATE alumno_servicio set ? WHERE id_alu = ? AND cod_ser = ?', [req.body, id_alu, cod_ser]);
            res.json({ text: 'Se ha actualizado el servicio al alumno' })
        } catch (error) {
            console.log('error al actualizar', error);
            next();
        }

    }
}

const adminAlu_SerController = new AdminAlu_SerController();
export default adminAlu_SerController;