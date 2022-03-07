//import { Docente } from './../../../client/src/app/models/interfaces';
import { Request, Response } from "express";
import pool from '../../datadase';

class AdminEstudianteController {
    //listar
    public async list(req: Request, res: Response) {
        const alumno = await pool.query('SELECT * FROM alumno');
        res.json(alumno);
    }

    //crear
    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO alumno set ?', [req.body]);
        res.json({ message: 'Alumno guardado' });
    }
    //borrar

    public async delete(req: Request, res: Response): Promise<void> {
        const { id_alu } = req.params;
        const alumno = await pool.query('DElETE FROM alumno WHERE id_alu = ?', [id_alu]);
        res.json({ message: 'alumno eliminado' });
    }



    //actualizar 

    public async update(req: Request, res: Response): Promise<void> {
        const { id_alu } = req.params;
        const alumno = await pool.query('UPDATE alumno set ? WHERE id_alu = ?', [req.body, id_alu]);

        res.json({ message: 'Alumno modificado' });
    }

    //listar solo por id

    public async getOne(req: Request, res: Response): Promise<any> { // para poder retornar , <void> no retorna
        const { id_alu } = req.params;
        const alumno = await pool.query('SELECT * FROM alumno WHERE id_alu = ?', [id_alu]);
        if (alumno.length > 0) {
            return res.json(alumno);
        } res.status(404).json({ text: 'No se encontro el alumno ' })
        res.json({ text: 'Alumno encontrado' });
    }


}

const adminEstudianteController = new AdminEstudianteController();
export default adminEstudianteController;
