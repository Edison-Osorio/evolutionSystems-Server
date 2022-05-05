import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";

class AdministradorController {
    // trae todos los administradores 
    public async listarTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const query = await pool.query("SELECT documento,nombre,email FROM usuario WHERE rol like '%administrador%'")
            res.json(query)
        } catch (error) {
            console.log('!ERROR --> ', error)
            next()
        }
    }

    // elimina el administrador 
    public async deleteAdministrador(req: Request, res: Response, next: NextFunction) {
        try {
            const { documento } = req.params
            const query = await pool.query("DELETE FROM usuario WHERE documento = ?", [documento])
            res.json('Se elimino con exito')
        } catch (error) {
            console.log('!ERROR --> ', error)
        }
    }

    //obtiene un solo administrador
    public async getOneAdministrador(req: Request, res: Response, next: NextFunction) {
        try {
            const { documento } = req.params
            const query = await pool.query('SELECT tipoDocumento,documento,nombre,email FROM usuario WHERE documento = ?', [documento])
            res.json(query[0])
        } catch (error) {
            console.log('!ERROR --> ', error)
        }
    }

    // actualiza el administrador
    public async updateAdministrador(req: Request, res: Response, next: NextFunction) {
        try {
            const { documento } = req.params
            const query = await pool.query('UPDATE usuario set ? WHERE documento = ? ', [req.body, documento])
            res.json('se actualizo')
        } catch (error) {
            console.log(error);
            next()
        }

    }
}


const administradorController = new AdministradorController();
export default administradorController;