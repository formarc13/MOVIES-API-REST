const {check, body} = require("express-validator");
const db = require("../database/models");
const bcrypt = require("bcryptjs");

module.exports = {
    login: [
        check("email")
            .notEmpty().withMessage("El email es requerido").bail()
            .isEmail().withMessage("Email inválido"),
        body("custom").custom((value, {req}) => {
            return db.User.findOne({
                where: {
                    email: req.body.email,
                }
            })
            .then((user) => {
                if(!bcrypt.compareSync(req.body.password, user.password)){
                    return Promise.reject()
                }
            })
            .catch((error) => {
                return Promise.reject("Credenciales inválidas")
            })
        }),
        check("password").notEmpty().withMessage("El password es requerido")
    ],
    register: [
        check("name").notEmpty().withMessage("El nombre es requerido"),
        check("email")
            .notEmpty().withMessage("El email es requerido").bail()
            .isEmail().withMessage("Email inválido"),
        body("email").custom((value) => {
            return db.User.findOne({
                where: {
                    email: value,
                }
            })
            .then((user) => {
                if(user){
                    return Promise.reject("Email ya registrado")
                }
            })
        }),
        check("password").notEmpty().withMessage("El password es requerido")
        .isLength({min: 6}).withMessage("La contraseña debe tener al menos 6 caracteres"),    
    ]
}

