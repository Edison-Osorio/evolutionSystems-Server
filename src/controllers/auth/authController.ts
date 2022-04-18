import pool from "../../datadase";
import { NextFunction, Request, Response } from "express";
import { encryptPassword, validatePassword } from "./bcrypt";
import jwt from "jsonwebtoken";

const keyIncryp = "evolutionSystems";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.contrasena = await encryptPassword(req.body.contrasena);

    const result = await pool.query("INSERT INTO usuario set ?", [req.body]);

    const token: string = jwt.sign({ result }, keyIncryp);

    res.header("auth-token", token).json(result);
  } catch (err) {
    console.log("Hey ocurrio un error ", err);

    res.json({
      msg: "Ocurrio un error al registrar el usuario, revise que la información si sea la requerida",
    });
    next();
  }
};

export const listOnUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const query = await pool.query(
      "SELECT * FROM usuario WHERE documento = ?",
      [id]
    );
    res.json(query[0]);
  } catch (error) {
    console.log("OCURRIO UN ERROR -->", error);
    next();
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {  
    const { id } = req.params;
  
    const query = await pool.query('UPDATE usuario SET ? WHERE documento = ? ', [req.body, id])
    res.json({text: 'Usuario Actualizado'})
  } catch (error) {
    console.log('Ocurrio un Error -->', error );
    next()
    
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const query = await pool.query("DELETE FROM usuario WHERE documento = ?", [
      id,
    ]);
    res.json({ text: "Se eliminó el usuario" });
  } catch (error) {
    console.log("Ocurrio un error -->", error);
    next();
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { documento, tipoDocumento } = req.body;
  const result = await pool.query(
    "SELECT * FROM usuario WHERE documento = ? and tipoDocumento=  ? ",
    [documento, tipoDocumento]
  );
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
    } else {
      console.log("Este es un error");
      return res.json({
        msg: "Informacion del Usuario Invalida",
      });
    }
  } catch (error) {
    console.log("Ocurrio un error -->", error);
    return res.json({
      msg: "Ocurrio un error al autentificarse",
    });
    next();
  }
};

export const getOnUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { documento, email } = req.body;

  const result = await pool.query(
    "SELECT * FROM usuario WHERE documento = ? AND email = ?",
    [documento, email]
  );

  try {
    if (result.length > 0 && result != null) {
      const user = result[0];

      if (!user) {
        res.json({
          ok: false,
          msg: "Usuario invalido revisa las credenciales",
        });
      }

      let data = JSON.stringify(result[0]);

      const token: string = jwt.sign(data, keyIncryp);
      res
        .header("auth-token", token)
        .json({ token, msgOk: "Usuario encontrado" });
    } else {
      console.log("Ocurrio un error");
      return res.json({
        msg: "Usuario invalido revisa las credenciales",
      });
    }
  } catch (err) {
    console.log("Ocurrios un error ------->", err);
    next();
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { documento, email, contrasena } = req.body;

    contrasena = await encryptPassword(contrasena);
    const result = await pool.query(
      "UPDATE usuario set ? WHERE documento = ? and email = ? ",
      [{ contrasena }, documento, email]
    );

    let data = JSON.stringify(result[0]);
    const token: string = jwt.sign({ data }, keyIncryp);

    res
      .header("auth-token", token)
      .json({ data, msg: "Contraseña actializada" });
  } catch (error) {
    console.log("el error es --->", error);
    next();
  }
};
