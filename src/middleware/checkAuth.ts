import { Request, Response, NextFunction } from "express";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ").pop();
    if (token) {
      next();
    } else {
      res.status(409).json({
        error: "No esta autorizado para acceder a estra ruta",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ error: "No esta autorizado para acceder a esta ruta" });
  }
};
