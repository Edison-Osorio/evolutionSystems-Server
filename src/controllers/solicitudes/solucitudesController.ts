import { NextFunction, Request, Response } from "express";
import pool from "../../datadase";


class SolicitudesController {
    // listar solicitudes 
    public async listSolicitudes(req: Request, res: Response, next: NextFunction) {
        try {
            const query = await pool.query("SELECT alumno.nombre_alumno,alumno.id_alumno,servicio.tipo_servicio,servicio.id_servicio,mensaje.mensaje,mensaje.id_mensaje FROM alumno INNER JOIN mensaje ON alumno.id_alumno=mensaje.id_alumno_m INNER JOIN servicio ON mensaje.id_servicio_m=servicio.id_servicio")
            res.json(query)
        } catch (error) {
            console.log("!ERROR -->", error)
            next();
        }
    }

    // guardar solicitudes 
    public async guardarSolicitud(req: Request, res: Response, next: NextFunction) {
        try {
            const query = await pool.query('INSERT INTO mensaje SET ?', [req.body])
            res.json({ text: 'Se guardo con exito' })
        } catch (error) {
            console.log('!ERROR --> ', error);
            next()
        }
    }

    // eliminar solicitud 
    public async eliminarSolicitud(req: Request, res: Response, next: NextFunction) {
        try {
            const { id_mensaje } = req.params
            const query = await pool.query('DELETE FROM mensaje WHERE id_mensaje= ?', [id_mensaje])
            res.json({ text: 'Se elimino con exito' })
        } catch (error) {
            console.log('!ERROR --> ', error);
            next()
        }
    }

    // Elimina la solicitud por medio del identificador del alumno 
    public async eliminarSolicitudAlumno(req: Request, res: Response, next: NextFunction) {
        try {
            const { id_alumno } = req.params
            const query = await pool.query('DELETE FROM mensaje WHERE id_alumno_m = ?', [id_alumno])
            res.json({ text: 'Se elimino con exito' })
        } catch (error) {
            console.log('!ERROR --> ', error);
            next()
        }
    }
    
    // contar solicitudes 
    public async contarSolicitudes(req: Request, res: Response, next: NextFunction){
        try {
            const query = await pool.query('SELECT COUNT(mensaje) AS total FROM mensaje')
            res.json(query)
        } catch (error) {
            console.log('!ERROR --> ',error);
            next()
        }
    }

}

const solicitudesController = new SolicitudesController()
export default solicitudesController