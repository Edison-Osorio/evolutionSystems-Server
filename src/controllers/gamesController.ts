import { Request, Response } from "express";
import pool from '../datadase';

class GamesController {
    public async list(req: Request, res: Response) {
        const game = await pool.query('SELECT * FROM game');
        res.json(game);
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO game set ?', [req.body]);
        res.json({ message: 'Game save' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const game = await pool.query('DElETE FROM game WHERE id = ?', [id]);
        res.json({ message: 'juego eliminado' });

    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const game = await pool.query('UPDATE game set ? WHERE id = ?', [req.body, id]);

        res.json({ message: 'el juego se modifico' });
    }

    public async getOne(req: Request, res: Response): Promise<any> { // para poder retornar , <void> no retorna
        const { id } = req.params;
        const game = await pool.query('SELECT * FROM game WHERE id = ?', [id]);
        if (game.length > 0) {
            return res.json(game[0]);
        } res.status(404).json({ text: 'el juego no existe' })
        res.json({ text: 'juego encontrado' });
    }
}

const gamesController = new GamesController();
export default gamesController;
