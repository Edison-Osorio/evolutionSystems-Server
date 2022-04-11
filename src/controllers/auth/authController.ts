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
  const { documento, tipoDocumento } = req.body;
  const result = await pool.query("SELECT * FROM usuario WHERE documento = ? and tipoDocumento=  ? ", [
    documento, tipoDocumento
  ]);
  try {
    if (result.length > 0 && result != null) {
      const user = result[0];
      if (!user)
        return res.json({
          ok: false,
          msg: "Informacion del Usuario Invalida",
        });

      let data = JSON.stringify(result[0]);
      const correctPaassword: boolean = await validatePassword(
        req.body.contrasena,
        user.contrasena
      );
      if (!correctPaassword)
        return res.json({
          // ok: false,
          msg: "Informacion del Usuario Invalida",
        });

      const token: string = jwt.sign(data, keyIncryp);

      res.header("auth-token", token).json({ token });

      // // token con expiracion
    }else{
      console.log('Este es un error');
      return res.json({
        msg: 'Informacion del Usuario Invalida'
      })
      
    }
  } catch (error) {
    console.log("Ocurrio un error -->", error);
    return res.json({
      msg: "Ocurrio un error al autentificarse",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documento } = req.params;

    req.body.contrasena = await encryptPassword(req.body.contrasena);

    console.log(req.body);

    const result = await pool.query(
      "UPDATE usuario set ? WHERE documento = ? ",
      [req.body, documento]
    );
    const token: string = jwt.sign({ result }, "edison");

    res.header("auth-token", token).json(result);
  } catch (error) {
    console.log("el error es --->", error);
    next();
  }
};

// Metodo para revisar documento

const validateDocument = async function (
  documento: string,
  userDocumento: string
): Promise<boolean> {
  if (documento === userDocumento) {
    return true;
  } else {
    return false;
  }
};
