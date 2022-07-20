const db = require("../../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const process = require("process");

module.exports = {
    create: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.create({
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
            })
            .then((user) => {
                if(user){
                    res.status(201).json({
                        status: 201,
                        message: "User created",
                        data: user,
                    })
                }else{
                    res.json({
                        message: "There's been a problem"
                    })
                }
            })
        }else{
            res.status(400).json({
                status: 400,
                errors: errors.mapped()
            })
        }
    },
    validate: (req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((user) => {
                if(user){
                    console.log(process.env.TOKEN_SECRET)
                    const token = jwt.sign({
                        name: user.name,
                        id: user.id
                    }, process.env.TOKEN_SECRET)

                    res.header("auth-token", token).status(200).json({
                        data: {token}
                    })
                }
            })
        }else{
            res.status(400).json({
                status: 400,
                errors: errors.mapped()
            })
        }
    }
}