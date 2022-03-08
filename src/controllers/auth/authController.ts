import pool from "../../datadase";
import { NextFunction, Request, Response } from "express";
import { encryptPassword, validatePassword } from "./bcrypt";
import jwt from "jsonwebtoken";

const keyIncryp = "evolutionSystems";

export const signup = async (req: Request, res: Response) => {
  console.log("hola mundo");

  req.body.contrasena = await encryptPassword(req.body.contrasena);

  const result = await pool.query("INSERT INTO usuario set ?", [req.body]);

  const token: string = jwt.sign({ result }, keyIncryp);

  res.header("auth-token", token).json(result);
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { documento } = req.body;
  const result = await pool.query("SELECT * FROM usuario WHERE documento = ?", [
    documento,
  ]);

  if (result.length > 0) {
    const user = result[0];

    if (!user) return res.status(400).json("Documento o contraseña incorrecta");

    let data = JSON.stringify(result[0]);

    const correctPaassword: boolean = await validatePassword(
      req.body.contrasena,
      user.contrasena
    );

    if (documento != user.documento)
      return res.status(400).json("Documento invalido");
    if (!correctPaassword) return res.status(400).json("Invalid Password");

    const token: string = jwt.sign(data, keyIncryp, {
    expiresIn: 60 * 60*24
    });

    res.header("auth-token", token).json({ token });

    // // token con expiracion
  }
};

export const updateUser = async (req: Request, res: Response,     next: NextFunction) => {

  try {
    
  const { documento } = req.params;

  req.body.contrasena = await encryptPassword(req.body.contrasena);

  console.log(req.body);

  const result = await pool.query("UPDATE usuario set ? WHERE documento = ? ", [
    req.body,
    documento,
  ]);
  const token: string = jwt.sign({ result }, "edison");

  res.header("auth-token", token).json(result);
  } catch (error) {
    console.log('el error es --->', error);
    next();
    
  }


};