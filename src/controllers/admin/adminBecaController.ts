import { Request, Response } from 'express';
import pool from '../../datadase';

class AdminBecaController{
    // listar
    public async list(req: Request, res: Response){
        const beca = await pool.query('SELECT * FROM beca');
        res.json(beca);
    }

    //crear
    public async createBeca(req: Request, res:Response): Promise<void>{
        const {id_alu} = req.params;
        
        //pool alumno=id>1 otro pool
        const beca = await pool.query('INSERT INTO beca set ? ', [req.body]);
        res.json({message: 'Beca creada'});
    }

    public async deleteBeca(req: Request, res: Response): Promise <void>{

    }


}