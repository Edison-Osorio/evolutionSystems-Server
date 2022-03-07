import { Request, Response, text } from 'express';

class IndexController {
    public index (req: Request, res:Response) {
        res.json({text:'API is /api/admin'});
    } 
}

export const indexController = new IndexController ();