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
exports.updateUser = exports.signin = exports.signup = void 0;
const datadase_1 = __importDefault(require("../../datadase"));
const bcrypt_1 = require("./bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keyIncryp = "evolutionSystems";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hola mundo");
    req.body.contrasena = yield (0, bcrypt_1.encryptPassword)(req.body.contrasena);
    const result = yield datadase_1.default.query("INSERT INTO usuario set ?", [req.body]);
    const token = jsonwebtoken_1.default.sign({ result }, keyIncryp);
    res.header("auth-token", token).json(result);
});
exports.signup = signup;
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { documento, tipoDocumento } = req.body;
    const result = yield datadase_1.default.query("SELECT * FROM usuario WHERE documento = ? and tipoDocumento=  ? ", [
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
            console.log('Este es un error');
            return res.json({
                msg: 'Informacion del Usuario Invalida'
            });
        }
    }
    catch (error) {
        console.log("Ocurrio un error -->", error);
        return res.json({
            msg: "Ocurrio un error al autentificarse",
        });
    }
});
exports.signin = signin;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { documento } = req.params;
        req.body.contrasena = yield (0, bcrypt_1.encryptPassword)(req.body.contrasena);
        console.log(req.body);
        const result = yield datadase_1.default.query("UPDATE usuario set ? WHERE documento = ? ", [req.body, documento]);
        const token = jsonwebtoken_1.default.sign({ result }, "edison");
        res.header("auth-token", token).json(result);
    }
    catch (error) {
        console.log("el error es --->", error);
        next();
    }
});
exports.updateUser = updateUser;
// Metodo para revisar documento
const validateDocument = function (documento, userDocumento) {
    return __awaiter(this, void 0, void 0, function* () {
        if (documento === userDocumento) {
            return true;
        }
        else {
            return false;
        }
    });
};