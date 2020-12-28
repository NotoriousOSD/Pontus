const express = require('express');
const bcrypt = require('bcryptjs');
const nJwt = require('njwt');
const config = require('./jwt/config');
const profileRoute = express.Router();

let Profile = require('../models/Profile');

profileRoute.route('/register').post((req, res, next) => {
    console.log("/register POST received");
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPassword;
    Profile.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

profileRoute.route('/login').post((req, res, next) => {
    console.log("/login POST received");
    Profile.findOne({userEmail: req.body.userEmail}, (error, data) => {
            if (error) {
                return next(error);
            }
            if (!data) {
                res.status(500).send('User not found');
            }

            if (!bcrypt.compareSync(req.body.password, data.password)) {
                return res.status(401).send({auth: false, token: null});
            }
            
            let jwt = nJwt.create({ id: data.id }, config.secret);
            jwt.setExpiration(new Date().getTime() + (24 * 60 * 60 * 1000));

            res.status(200).send({auth: true, token: jwt.compact() });
        });


    Profile.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

module.exports = profileRoute;
