const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const moment = require("moment");
const { connection } = require("../db/db");
const { users } = require("../models/users");

router.post("/register", async(req, res) => {
    const {userNick, fullName, email, phone, address, password} = req.body;

    if (!userNick || !fullName || !email || !phone || !address || !password)
        return res.status(400).send({message: 'Process failed: Incomplete data'})

    const hash = await bcrypt.hash(password, 10);

    connection.query(users(userNick, fullName, email, phone, address, hash, 'user').setUser, function(err, result) {
        if (err) {
            return res.status(401).send('Process failed')
          }
          res.status(200).send({message: "User Registered successfully"})
    })
})

router.get("/login", async(req, res) => {
    const {userNick, email, password} = req.body;

    if (!(email || userNick) || !password)
        return res.status(400).send({message: 'Process failed: Incomplete data'})

    connection.query(users(userNick, null, email, null, null, null, null).getOne, async function (err, result) {
        if (err) {
            return res.status(401).send({message: 'Process failed'})
          }

        if (result == "")
            return res.status(400).send({message: "Incorrect email or password"})

        const hash = await bcrypt.compare(password, result[0].password);
        if (!hash)
              return res.status(400).send({message: "Incorrect email or password"});

        try {
            var jwtToken = jwt.sign({
                id: result[0].id,
                userNick: result[0].userNick,
                fullName: result[0].fullName,
                role: result[0].role,
                iat: moment().unix()
            }, process.env.JWT_TOKEN);
            return res.status(200).json({usuario: result[0].userNick, jwtToken});
        } catch (e) {
            return res.status(400).send({message: "Login error"});
        }
    });
})

module.exports = router