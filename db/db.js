let mysql = require('mysql');
const bcrypt = require("bcrypt");
let { users } = require("../models/users");
let { dishes } = require("../models/dishes");
let { orderHistory } = require("../models/orderHistory");
let { favoriteDish } = require("../models/favoriteDish");
const { orderDetail } = require('../models/orderDetail');
const { paymentTypes } = require('../models/paymentTypes');
const { orderStatus } = require("../models/orderStatus")

require("dotenv").config();

let dbConfig = {
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  database : process.env.DB_DATABASE,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD
}

let connection;


// const dbConnection = async() => {
//   connection.connect(function(err) {
//     if (err) {
//       console.error('Error connecting to DB: ' + err.stack);
//       return;
//     }
//     console.log('Connected to DB as id ' + connection.threadId);
//   });
// }

const dbDelete = async() => {
  connection.query(favoriteDish().deleteTable, function (err, result) {
    if (err) throw err;
    console.log("Favorite Dishes Table deleted");
  });
  connection.query(orderDetail().deleteTable, function (err, result) {
    if (err) throw err;
    console.log("Order History Table deleted");
  });
  connection.query(orderHistory().deleteTable, function (err, result) {
    if (err) throw err;
    console.log("Order History Table deleted");
  });
  connection.query(paymentTypes().deleteTable, function (err, result) {
    if (err) throw err;
    console.log("Payment Types Table deleted")
  });
  connection.query(orderStatus().deleteTable, function (err, result) {
    if (err) throw err;
    console.log("Order Status Table deleted")
  });
  connection.query(users().deleteTable, function (err, result) {
    if (err) throw err;
    console.log("Users table deleted");
  });
}

const dbCreate = async() => {
  connection.query(users().createTable, function (err, result) {
    if (err) throw err;
    console.log("Users table created");
  });
  connection.query(dishes().createTable, function (err, result) {
    if (err) throw err;
    console.log("Dishes table created");
  });
  connection.query(favoriteDish().createTable, function (err, result) {
    if (err) throw err;
    console.log("Favorite Dishes Table created");
  }); 
  connection.query(paymentTypes().createTable, function (err, result) {
    if (err) throw err;
    console.log("Payment Types Table created");
  });
  connection.query(orderStatus().createTable, function (err, result) {
    if (err) throw err;
    console.log("Order Status Table created")
  });
  connection.query(orderHistory().createTable, function (err, result) {
    if (err) throw err;
    console.log("Order History Table created");
  });
  connection.query(orderDetail().createTable, function (err, result) {
    if (err) throw err;
    console.log("Order Detail Table created");
  });
  
}

const dbInit = async() => {
  const hash = await bcrypt.hash('1234', 10);
  connection.query(users('admin', 'Administrador', 'admin@gmail.com', '123456', 'Calle 0 # 0 - 0', hash, 'admin').setUser, function (err, result) {
    if (err) throw err;
    console.log("Admin registered");
  });
  const hash1 = await bcrypt.hash('1234', 10);
  connection.query(users('natalia', 'Natalia Ortiz Maldonado', 'natalia@gmail.com', '4552542', 'Calle 1 # 1 - 1', hash1, 'user').setUser, function (err, result) {
    if (err) throw err;
    console.log("User registered");
  });
  connection.query(paymentTypes().setValues, function (err, result) {
    if (err) throw err;
    console.log("Payment Types registered")
  });
  connection.query(orderStatus().setValues, function (err, result) {
    if (err) throw err;
    console.log("Order Statuses registered")
  });
}

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      setTimeout(handleDisconnect, 2000);
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.on('error', function(err) {
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();
dbDelete();
dbCreate();
dbInit();

module.exports = { connection, dbInit };