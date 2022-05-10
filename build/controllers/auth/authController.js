"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.getOnUser = exports.signin = exports.deleteUser = exports.update = exports.listOnUser = exports.signup = void 0;
const datadase_1 = __importDefault(require("../../datadase"));
const bcrypt_1 = require("./bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keyIncryp = "evolutionSystems";
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.contrasena = yield (0, bcrypt_1.encryptPassword)(req.body.contrasena);
        const result = yield datadase_1.default.query("INSERT INTO usuario set ?", [req.body]);
        const token = jsonwebtoken_1.default.sign({ result }, keyIncryp);
        res.header("auth-token", token).json(result);
    }
    catch (err) {
        console.log("Hey ocurrio un error ", err);
        next();
    }
});
exports.signup = signup;
const listOnUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = yield datadase_1.default.query("SELECT * FROM usuario WHERE documento = ?", [id]);
        res.json(query[0]);
    }
    catch (error) {
        console.log("OCURRIO UN ERROR -->", error);
        next();
    }
});
exports.listOnUser = listOnUser;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = yield datadase_1.default.query('UPDATE usuario SET ? WHERE documento = ? ', [req.body, id]);
        res.json({ text: 'Usuario Actualizado' });
    }
    catch (error) {
        console.log('Ocurrio un Error -->', error);
        next();
    }
});
exports.update = update;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const query = yield datadase_1.default.query("DELETE FROM usuario WHERE documento = ?", [
            id,
        ]);
        res.json({ msg: "Se eliminó el usuario" });
    }
    catch (error) {
        console.log("Ocurrio un error -->", error);
        next();
    }
});
exports.deleteUser = deleteUser;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { documento, tipoDocumento } = req.body;
    const result = yield datadase_1.default.query("SELECT * FROM usuario WHERE documento = ? and tipoDocumento=  ? ", [documento, tipoDocumento]);
    try {
        if (result.length > 0 && result != null) {
            const user = result[0];
            if (!user)
                return res.json({
                    ok: false,
                    msg: "Informacion del Usuario Invalida",
                });
            let data = JSON.stringify(result[0]);
            const correctPaassword = yield (0, bcrypt_1.validatePassword)(req.body.contrasena, user.contrasena);
            if (!correctPaassword)
                return res.json({
                    // ok: false,
                    msg: "Informacion del Usuario Invalida",
                });
            const token = jsonwebtoken_1.default.sign(data, keyIncryp);
            res.header("auth-token", token).json({ token });
            // // token con expiracion
        }
        else {
            console.log("Este es un error");
            return res.json({
                msg: "Informacion del Usuario Invalida",
            });
        }
    }
    catch (error) {
        console.log("Ocurrio un error -->", error);
        return res.json({
            msg: "Ocurrio un error al autentificarse",
        });
        next();
    }
});
exports.signin = signin;
const getOnUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { documento, email } = req.body;
    const result = yield datadase_1.default.query("SELECT * FROM usuario WHERE documento = ? AND email = ?", [documento, email]);
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
            const token = jsonwebtoken_1.default.sign(data, keyIncryp);
            res
                .header("auth-token", token)
                .json({ token, msgOk: "Usuario encontrado" });
        }
        else {
            console.log("Ocurrio un error");
            return res.json({
                msg: "Usuario invalido revisa las credenciales",
            });
        }
    }
    catch (err) {
        console.log("Ocurrios un error ------->", err);
        next();
    }
});
exports.getOnUser = getOnUser;
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { documento, email, contrasena } = req.body;
        contrasena = yield (0, bcrypt_1.encryptPassword)(contrasena);
        const result = yield datadase_1.default.query("UPDATE usuario set ? WHERE documento = ? and email = ? ", [{ contrasena }, documento, email]);
        let data = JSON.stringify(result[0]);
        const token = jsonwebtoken_1.default.sign({ data }, keyIncryp);
        res
            .header("auth-token", token)
            .json({ data, msg: "Contraseña actializada" });
    }
    catch (error) {
        console.log("el error es --->", error);
        next();
    }
});
exports.updatePassword = updatePassword;
