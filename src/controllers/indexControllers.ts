import { Request, Response, text } from 'express';

class IndexController {
    public index (req: Request, res:Response) {
        res.json({text:'La API esta en localhost:3000/api/'});
    } 
}

export const indexController = new IndexController ();