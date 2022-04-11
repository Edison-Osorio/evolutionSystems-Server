import { Request, Response, NextFunction } from "express";
import pool from '../../datadase';

class AdminEstudianteController {
    //listar
    public async list(req: Request, res: Response) {
        const query = await pool.query('SELECT * FROM alumno');
        res.json(query);
    }

    public async listAlum(req: Request, res: Response) {
        const { cod_gra } = req.params;
        const query = await pool.query('SELECT alumno.id_alu,alumno.nom_alu, alumno.tel_alu, alumno.dire_alu, alumno.tel_alu,alumno.fec_alu, alumno.nom_pa, alumno.nom_ma, alumno.dat_ban_alu  FROM grado INNER JOIN  alumno ON grado.cod_gra=alumno.cod_gra WHERE alumno.cod_gra= ?', [cod_gra]);
        res.json(query);
    }

    //crear
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const query = await pool.query('INSERT INTO alumno set ? ', [req.body]);
            res.json({ message: 'Alumno guardado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //borrar
    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_alu } = req.params;
            const query = await pool.query('call deleteAlumno(?)', [id_alu]);
            //DElETE FROM alumno WHERE id_alu = ?
            res.json({ message: 'alumno eliminado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //actualizar 
    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_alu } = req.params;
            const query = await pool.query('UPDATE alumno set ? WHERE id_alu = ?', [req.body, id_alu]);

            res.json({ message: 'Alumno modificado' });
        } catch (error) {
            console.log('ERROR ---->', error);
            next();
        }

    }

    //listar solo por id
    public async getOne(req: Request, res: Response, next: NextFunction): Promise<any> { // para poder retornar , <void> no retorna
        try {
            const { id_alu } = req.params;
            const query = await pool.query('SELECT * FROM alumno WHERE id_alu =? ', [id_alu]);
            res.json({ text: query });
        } catch (error) {
            console.log('ERROR ---->', error);
            next()
        }

    }


}

const adminEstudianteController = new AdminEstudianteController();
export default adminEstudianteController;
