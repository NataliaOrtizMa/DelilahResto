const express = require('express');
const helmet = require('helmet');
const expressJwt = require('express-jwt');
require("dotenv").config();
const app = express();

const Users = require("./routes/users")
const Dishes = require("./routes/dishes")
const FavoriteDishes = require("./routes/favoriteDish")
const OrderHistory = require("./routes/orderHistory")
const OrderDetail = require("./routes/orderDetail")

app.use(helmet())
app.use(express.json());
// app.use(express.urlencoded());
app.use(expressJwt({ secret: process.env.JWT_TOKEN, algorithms: ['HS256'] }).unless({ path: ["/api/users/login", "/api/users/register"] }));

app.use("/api/users/", Users)
app.use("/api/dishes/", Dishes)
app.use("/api/favoriteDishes/", FavoriteDishes)
app.use("/api/orderHistory/", OrderHistory)
app.use("/api/orderDetail/", OrderDetail)

app.listen(process.env.SERVER_PORT, function () {
    console.log('El servidor express corre en el puerto ' + process.env.SERVER_PORT);
});    
