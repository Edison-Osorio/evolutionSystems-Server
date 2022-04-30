import { Request, Response, NextFunction } from "express";
import pool from "../../datadase";

class AlumnoController {

    public async listNotas(req: Request, res: Response, next: NextFunction) {
        try {
            const { id_alu } = req.params;
            const query = await pool.query('SELECT alumno.nom_alu,asignatura.nom_asi,nota1, nota2,nota3,nota4,nota5,nota_final FROM nota INNER JOIN asignatura ON nota.id_asi=asignatura.id_asi INNER JOIN alumno ON nota.id_alu=alumno.id_alu WHERE nota.id_alu = ? ', [id_alu]);
            res.json(query)
            console.log(query);
        } catch (error) {
            console.log('ERROR --->', error);
            next();

        }
    }

    //programador
    public async listHorario(req: Request, res: Response, next: NextFunction) {
        try {
            const { id_alu } = req.params;
            const query = await pool.query('SELECT asignatura.nom_asi,horario.fec_hor,horario.hora FROM horario INNER JOIN asignatura ON horario.cod_hor=asignatura.cod_hor INNER JOIN nota ON asignatura.id_asi=nota.id_asi WHERE nota.id_alu=? ', [id_alu]);
            res.json(query);
            console.log(query);
        } catch (error) {
            console.log('ERROR --->', error);
            next();
        }
    }
    //servicios
    public async listServicios(req: Request, res: Response, next: NextFunction) {

        try {
            const { id_alu } = req.params;
            const query = await pool.query('SELECT alumno.nom_alu,servicio.tipo_ser,servicio.desc_ser FROM alumno_servicio INNER JOIN alumno ON alumno.id_alu=alumno_servicio.id_alu INNER JOIN servicio on servicio.cod_ser=alumno_servicio.cod_ser WHERE alumno.id_alu=?', [id_alu]);
            res.json(query)
        } catch (error) {
            console.log('ERROR --->', error);
            next();
        }

    }

}


const alumnoController = new AlumnoController();
export default alumnoController;
